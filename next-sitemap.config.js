module.exports = {
  siteUrl: 'https://femtolab.shop',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/contact',
    'canceled',
    '/delivery',
    '/orders/manage',
    '/privacy',
    '/products/manage',
    '/shop',
    '/success',
    '/terms',
    '/users/*'
  ]
  
  ,robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
            '/contact',
            'canceled',
            '/delivery',
            '/orders/manage',
            '/privacy',
            '/products/manage',
            '/shop',
            '/success',
            '/terms',
            '/users/*'
        ],
      },
    ],
  },
}