# ecommerce-project
E-Commerce project using Spring and Angular

# How to run the app
* Setup MySQL, configure DB, run DB scripts from the `db-scripts` folder
* Create an OKTA dev account and add/replace the required okta related properties in the `application.properties` of the spring-boot app
* Generate the required certificates. The details can be found here:
  * https://github.com/darbyluv2code/fullstack-angular-and-springboot/blob/master/bonus-content/secure-https-communication/openssl-setup.md
  * https://github.com/darbyluv2code/fullstack-angular-and-springboot/blob/master/bonus-content/secure-https-communication/keytool-steps.md
* Create a Stripe dev account and obtain the required publishable keys and secrets from Stripe. Then just add them into the properties (`stripe.key.secret` in the `application.properties` in the spring-boot app and `stripePublishableKey` in the file under `ecommerce-project-fe/src/environments`)