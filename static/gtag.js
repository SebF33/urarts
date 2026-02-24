window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
window.gtag = gtag;

gtag('js', new Date());

/**
 * Aucun tracking tant que l'utilisateur n'accepte pas
 */
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});

/**
 * Configuration GA (désactivée tant que 'denied')
 */
gtag('config', 'G-QCTN24H4SD', {
  anonymize_ip: true
});

/**
 * Appelé quand l'utilisateur accepte
 */
window.enableAnalytics = function () {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });
};

/**
 * Envoi position
 */
window.sendGeolocation = function (lat, lng) {
  try {
    if (!lat || !lng) return;

    gtag('event', 'geolocation', {
      latitude: Number(lat.toFixed(3)), // précision réduite RGPD
      longitude: Number(lng.toFixed(3)),
    });

  } catch (e) {
    console.warn("geolocation send failed", e);
  }
};