import cors from 'cors';
import {corsConfig} from "../config/corsConfig";
import {SlowDownMiddleware} from "./SpeedLimiterMiddleware";
import helmet = require("helmet");

/************* Helmet config **********************/
/* more details: https://helmetjs.github.io/docs/ */
const GlobalSecurityGroup = [
    // Initialize helmet includes X-XSS-Protection, X-DNS-Prefetch-Control,
    // Strict-Transport-Security, X-Content-Type-Options headers
    helmet(),

    // set header X-Frame-Options to deny against clickjacking
    helmet.frameguard({action: 'deny'}),

    // set header X-Permitted-Cross-Domain-Policies: none
    // helmet.permittedCrossDomainPolicies(),

    // Lie and fake the powered by header to display php 5.6
    helmet.hidePoweredBy({setTo: 'PHP 5.6.0'}),

    // set header Referrer-Policy: no-referrer
    helmet.referrerPolicy(),

    // set header Content-Security-Policy: script-src 'self'
    helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: ["'self'"]
        }
    }),

    /* CORS config middleware */
    cors(corsConfig),

    /* Slow down middleware */
    new SlowDownMiddleware().toCallable(),
];

export {GlobalSecurityGroup};
