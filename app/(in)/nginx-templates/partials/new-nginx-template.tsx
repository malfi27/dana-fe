'use client'
import { Card, CardContent, SectionTitle } from 'ui'
import { Contenteditable } from '@/components/contenteditable'

export function NewNginxTemplate() {
  return (
    <Card>
      <SectionTitle
        title={'New Nginx Template'}
        description={'Create a new Nginx template to use in your sites.'}
      />
      <CardContent>
        <Contenteditable>{stringDefaultConfig}</Contenteditable>
      </CardContent>
    </Card>
  )
}

const stringDefaultConfig = `# DEAFULT CONFIG (DO NOT REMOVE!)
include root-conf/{{ SITE }}/before/*;

server {
    listen {{ PORT }};
    listen {{ PORT_V6 }};
    server_name {{ DOMAINS }};
    server_tokens off;
    root {{ PATH }};

# DEAFULT SSL (DO NOT REMOVE!)
# ssl_certificate;
# ssl_certificate_key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers TLS_AES_256_GCM_SHA384,TLS_CHACHA20_POLY1305_SHA256,TLS_AES_128_GCM_SHA256,TLS_AES_128_CCM_8_SHA256,TLS_AES_128_CCM_SHA256,ECDHE-ECDSA-AES256-GCM-SHA384,ECDHE-RSA-AES256-GCM-SHA384,ECDHE-ECDSA-CHACHA20-POLY1305,ECDHE-RSA-CHACHA20-POLY1305,ECDHE-ECDSA-AES128-GCM-SHA256,ECDHE-RSA-AES128-GCM-SHA256,ECDHE-ECDSA-AES256-SHA384,ECDHE-RSA-AES256-SHA384,ECDHE-ECDSA-AES128-SHA256,ECDHE-RSA-AES128-SHA256;
    ssl_prefer_server_ciphers off;
    ssl_dhparam /etc/nginx/dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

# DEAFULT CONFIG (DO NOT REMOVE!)
    include root-conf/{{ SITE }}/server/*;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
}

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/{{ SITE }}-error.log error;

    error_page 404 /index.php;

    location ~ \\.php$ {
        fastcgi_split_path_info ^(.+\\.php)(/.+)$;
        fastcgi_pass {{ PROXY_PASS }};
        fastcgi_index index.php;
        include fastcgi_params;
    }

    location ~ /\\.(?!well-known).* {
    deny all;
}
}

# DEAFULT CONFIG (DO NOT REMOVE!)
include root-conf/{{ SITE }}/after/*;
`
