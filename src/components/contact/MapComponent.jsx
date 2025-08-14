'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet dans Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ 
  locations = [], 
  center = [6.4281, 2.3833], // Coordonnées d'Abomey-Calavi, Bénin par défaut
  zoom = 15,
  height = "h-96",
  tileProvider = "osm" // Options: "osm", "cartodb", "esri", "google"
}) => {
  const [isClient, setIsClient] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Configuration des différents fournisseurs de tuiles
  const tileProviders = {
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    cartodb: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    },
    esri: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      maxZoom: 18
    },
    google: {
      url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
      maxZoom: 20
    }
  };

  const selectedProvider = tileProviders[tileProvider] || tileProviders.osm;

  if (!isClient) {
    return (
      <div className={`w-full ${height} bg-gray-200 flex items-center justify-center rounded-lg`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className={`w-full ${height} bg-red-50 border border-red-200 flex items-center justify-center rounded-lg`}>
        <div className="text-center p-4">
          <div className="text-red-600 text-4xl mb-2">⚠️</div>
          <p className="text-red-800 font-medium">Erreur de chargement de la carte</p>
          <p className="text-red-600 text-sm mt-1">Vérifiez votre connexion internet</p>
          <button 
            onClick={() => {
              setMapError(false);
              window.location.reload();
            }}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden shadow-lg`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        whenCreated={(mapInstance) => {
          // Force le redimensionnement de la carte après le chargement
          setTimeout(() => {
            mapInstance.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          attribution={selectedProvider.attribution}
          url={selectedProvider.url}
          maxZoom={selectedProvider.maxZoom}
          crossOrigin={true}
          // Gestion des erreurs de chargement des tuiles
          eventHandlers={{
            tileerror: (e) => {
              console.warn('Erreur de chargement de tuile:', e);
              // Optionnel: basculer vers un autre fournisseur en cas d'erreur
            },
            tileloadstart: () => {
              setMapError(false);
            }
          }}
        />
        
        {/* Fournisseur de secours en cas d'échec du premier */}
        {tileProvider === "osm" && (
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            maxZoom={20}
            opacity={0}
            eventHandlers={{
              tileload: () => {
                // Ce layer de secours ne s'affiche que si le principal échoue
              }
            }}
          />
        )}
        
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{location.name}</h3>
                
                {location.address && (
                  <div className="flex items-start mb-2">
                    <span className="text-blue-600 mr-2">📍</span>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                )}
                
                {location.details && (
                  <p className="text-sm text-gray-600 mb-2">{location.details}</p>
                )}
                
                {location.description && (
                  <div className="text-sm text-gray-700 mb-3 p-2 bg-gray-50 rounded">
                    {location.description}
                  </div>
                )}
                
                <div className="space-y-1">
                  {location.phone && (
                    <a 
                      href={`tel:${location.phone}`}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span className="mr-2">📞</span>
                      {location.phone}
                    </a>
                  )}
                  
                  {location.email && (
                    <a 
                      href={`mailto:${location.email}`}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span className="mr-2">✉️</span>
                      {location.email}
                    </a>
                  )}
                </div>
                
                {location.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                    {location.category}
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Sélecteur de fournisseur de tuiles */}
      <div className="absolute top-2 right-2 z-[1000]">
        <select 
          value={tileProvider}
          onChange={(e) => window.location.reload()} // Recharge pour changer le provider
          className="text-xs bg-white border border-gray-300 rounded px-2 py-1 shadow-sm"
          title="Changer le fournisseur de carte"
        >
          <option value="osm">OpenStreetMap</option>
          <option value="cartodb">CartoDB</option>
          <option value="esri">Esri</option>
          <option value="google">Google</option>
        </select>
      </div>
    </div>
  );
};

export default MapComponent;
