import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Query_Orders } from '../../../common/hooks/Order/querry_Order';

mapboxgl.accessToken = 'pk.eyJ1IjoibmFkdWMiLCJhIjoiY200MDIydDZnMXo4dzJpcjBiaTBiamRmdiJ9.-xDuU81CG7JJDtlHK5lc7w';

const Mapbox = ({ id }: any) => {
    const { data } = Query_Orders(id);
    const [customerLocation, setCustomerLocation] = useState<[number, number] | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const shopLocation: [number, number] = [105.7421, 21.0376];

    const getCustomerLocation = async (address: string) => {
        try {
            const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json', {
                params: {
                    access_token: mapboxgl.accessToken,
                    limit: 1,
                },
            });

            if (response.data.features && response.data.features.length > 0) {
                const [lng, lat] = response.data.features[0].geometry.coordinates;
                setCustomerLocation([lng, lat]);
            }
        } catch (error) {
            console.error('Error getting customer location:', error);
        }
    };

    useEffect(() => {
        if (data && data.customerInfo && data.customerInfo.address) {
            getCustomerLocation(data.customerInfo.address);
        }
    }, [data]);

    useEffect(() => {
        if (customerLocation) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current!,
                center: shopLocation,
                zoom: 16,
            });
            const fetchRoute = async () => {
                try {
                    const response = await axios.get(
                        `https://api.mapbox.com/directions/v5/mapbox/driving/${shopLocation.join(
                            ','
                        )};${customerLocation.join(',')}`,
                        {
                            params: {
                                geometries: 'geojson',
                                access_token: mapboxgl.accessToken,
                            },
                        }
                    );

                    const route = response.data.routes[0].geometry;
                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: route,
                        },
                    });

                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round',
                        },
                        paint: {
                            'line-color': '#0074d9',
                            'line-width': 4,
                        },
                    });
                } catch (error) {
                    console.error('Error fetching route:', error);
                }
            };

            map.on('load', fetchRoute);

            return () => map.remove();
        }
    }, [customerLocation]);

    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col items-center">
            <div ref={mapContainerRef} className="w-full h-full rounded-lg shadow-lg border border-gray-300" />
        </div>
    );
};

export default Mapbox;
