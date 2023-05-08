import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'

interface Position {
    lat: number;
    lng: number;
}
const containerStyle = {
    width: '50%',
    height: '250px',
};
const center = {
    lat: 35.681167,
    lng: 139.767052,
};

const postionTokyo = {
    lat: 35.68181227967,
    lng: 139.76692300691604
}

interface IProps {
    position: Position | null;
    setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
    apiKey: string;
}

const GoogleMapField = (props: IProps) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: props.apiKey ?? ''
    })

    // Map上にポインタを設定
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newPosition = {
            lat: event.latLng!.lat(),
            lng: event.latLng!.lng(),
        };
        props.setPosition(newPosition);
    };

    return (
        <>
            {isLoaded ?
                (<GoogleMap
                    mapContainerStyle={containerStyle}
                    center={props.position ?? center}
                    zoom={13}
                    onClick={handleMapClick}
                >
                    <Marker position={props.position ?? postionTokyo} />
                    <input id="position" type="hidden" value={`${props.position?.lat!}/${props.position?.lng!}`} />
                </GoogleMap>
                )
                :
                <></>
            }
        </>
    )
}

export default GoogleMapField
