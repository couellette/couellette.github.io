import sys
import json
import requests

"---------- LOGGING -------------------------"
import logging,sys
root = logging.getLogger()
root.setLevel(logging.INFO)
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s [%(levelname)s]: %(message)s",
                              "%Y-%m-%d %H:%M:%S")
ch.setFormatter(formatter)
root.addHandler(ch)
"---------------------------------------------"

def get_ips_from_shodan(key):
    """Run a shodan search and return a list of IPs matching criteria.

    :param key SHODAN API Key
    :return [ip_str1,ip_str2,...]
    """
    logging.info('Running Shodan Search')
    p  = {
        'query': 'port:18245,18246 product:"general electric" country:"US"',
        #'query' : 'general electric',
        'facets':''
    }
    res = requests.get('https://api.shodan.io/shodan/host/search?key=' + key,params=p)

    return [ip['ip_str'] for ip in res.json()['matches']]

def get_info_from_censys(uid,secret,ip):
    """Return a list of results for a given IP from Censys

    :param uid UID
    :param secret SECRET ID
    :param ip The ip of interest
    """
    API_URL = "https://www.censys.io/api/v1"
    UID = uid
    SECRET = secret

    logging.info('Running a censys search for ip: {}'.format(ip))
    res = requests.get(API_URL + '/view/ipv4/' + ip, auth=(UID,SECRET))

    protocols = res.json()['protocols']
    routed_prefix = res.json()['autonomous_system']['routed_prefix']
    lat = res.json()['location']['latitude']
    lng = res.json()['location']['longitude']

    return (lat, lng, routed_prefix, protocols)

def get_true_lat_lng_from_ipinfodb(key,ip):
    """Get a true lat/lng from ipinfodb

    :param key API key
    :param ip IP of interest (no "/" at the end)
    """
    logging.info('Grabbing a lat/lng for ip: {}'.format(ip))

    res = requests.get('http://api.ipinfodb.com/v3/ip-city/?key=' + key + '&ip=' + ip)

    lat = res.text.split(';')[-3]
    lng = res.text.split(';')[-2]

    return (lat,lng)

def get_location_from_google_maps(key,lat,lng,radius=5000):
    """Return a list of possible customers from Google Maps.

    Note: only return places that are an 'establishment' or
          a 'point_of_interest'

    :param key Google Maps API Key
    :param lat Latitude
    :param lng Longitude
    :param radius default=5000
    """

    # Get the list of places using the Place Nearby Search API
    # Potential places are water treatment facilities, power plants, etc.
    p1 = {
        'location':'%s,%s' % (lat,lng),
        'radius':radius,
        'name':'water treatment',
        'key':key
    }
    r1 = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',params=p1)

    p2 = {
        'location':'%s,%s' % (lat,lng),
        'radius':radius,
        'name':'power',
        'key':key
    }
    r2 = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',params=p1)

    saved_places = {}
    for place in r1.json()['results']:
        if 'establishment' in place['types'] or \
        'point_of_interest' in place['types']:
            # saved_places.append((place['place_id'],
            #                      place['reference'],
            #                      place['name']))

            saved_places[place['place_id']] = {
                'ref' : place['reference'],
                'name' : place['name']
            }

    for place in r2.json()['results']:
        if 'establishment' in place['types'] or \
        'point_of_interest' in place['types']:
            # saved_places.append((place['place_id'],
            #                      place['reference'],
            #                      place['name']))

            saved_places[place['place_id']] = {
                'ref' : place['reference'],
                'name' : place['name']
            }

    # Get the full address & phone number using the Place Details API
    for place_id in saved_places.keys():

        p = {
            'key': key,
            'placeid': place_id
        }
        r = requests.get('https://maps.googleapis.com/maps/api/place/details/json',params=p)

        phone = r.json()['result']['formatted_phone_number']
        address = r.json()['result']['formatted_address']

        saved_places[place_id]['phone'] = phone
        saved_places[place_id]['address'] = address

    return saved_places
