var Protect = require("./middleware/protect");

/**
 * Instantiate a Auth.
 *
 * The `SAMLAuthProjId` is required.
 *
 * The `SAMLAuthProjId` is the ID of the MBaaS SAML created in your
 * RHMAP Studio, this is required to call it and check if the user has a valid
 * session.
 *
 * @constructor
 *
 * @param      {String}    SAMLAuthProjId          SAML Auth Project ID
 *
 * @return     {Auth}  A constructed Auth object.
 *
 */
function Auth (SAMLAuthProjId) {

    if (!SAMLAuthProjId ) {
    throw new Error('SAMLAuthProjId must be set up');
  }
  this.SAMLAuthProjId = SAMLAuthProjId;
}

/**
 * Apply protection middleware to an application or specific URL.
 *
 * If no `role` parameter is provided, the subsequent handlers will
 * be invoked if the user is authenticated, regardless of what roles
 * he or she may or may not have.
 *
 * If a user is not currently authenticated, the middleware will cause
 * the authentication workflow to begin by returning the user the statusCode
 * required. Upon successful login, the user will
 * be redirected back to the originally-requested URL, fully-authenticated.
 *
 * If a `role` is provided, the same flow as above will occur to ensure that
 * a user it authenticated.  Once authenticated, the role will then be evaluated
 * to determine if the user may or may not access the following resource.
 *
 * The `role` is a `String`, specifying a single required role,
 *
 * Example
 *
 *     // Users must have the `AC` role within this application
 *     app.get( '/AC/:page', keycloak.protect( 'AC' ), myACHandler );
 *
 * With no role, simple authentication is all that is required:
 *
 *     app.get( '/test', auth.protect(), testHandler );
 *
 * @param {String} role The role of the app to check if the user has the rights to call to that service
 */
Auth.prototype.protect = function (spec) {
  return Protect(this, spec);
};
module.exports = Auth;