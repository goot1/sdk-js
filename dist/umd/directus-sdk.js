/**! @directus/sdk-js v5.4.0-rc.0 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Directus = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @module Configuration
     */
    var STORAGE_KEY = "directus-sdk-js";
    /**
     * Configuration holder for directus implementations
     * @author Jan Biasi <biasijan@gmail.com>
     */
    var Configuration = /** @class */ (function () {
        /**
         * Creates a new configuration instance, will be used once for each directus instance (passing refs).
         * @constructor
         * @param {IConfigurationOptions} initialConfig   Initial configuration values
         * @param {IStorageAPI?} storage                  Storage adapter for persistence
         */
        function Configuration(initialConfig, storage) {
            if (initialConfig === void 0) { initialConfig = {}; }
            this.storage = storage;
            var dehydratedConfig = {};
            if (storage && Boolean(initialConfig && initialConfig.persist)) {
                // dehydrate if storage was provided and persist flag is set
                dehydratedConfig = this.dehydratedInitialConfiguration(storage);
            }
            var persist = Boolean(dehydratedConfig.persist || initialConfig.persist);
            var project = dehydratedConfig.project || initialConfig.project || Configuration.defaults.project;
            var tokenExpirationTime = dehydratedConfig.tokenExpirationTime ||
                initialConfig.tokenExpirationTime ||
                Configuration.defaults.tokenExpirationTime;
            this.internalConfiguration = __assign({}, initialConfig, dehydratedConfig, { persist: persist,
                project: project,
                tokenExpirationTime: tokenExpirationTime });
        }
        Object.defineProperty(Configuration.prototype, "token", {
            // ACCESSORS =================================================================
            get: function () {
                return this.internalConfiguration.token;
            },
            set: function (token) {
                this.partialUpdate({ token: token });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "tokenExpirationTime", {
            get: function () {
                return this.internalConfiguration.tokenExpirationTime;
            },
            set: function (tokenExpirationTime) {
                // TODO: Optionally re-compute the localExp property for the auto-refresh
                this.partialUpdate({
                    tokenExpirationTime: tokenExpirationTime * 60000,
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "url", {
            get: function () {
                return this.internalConfiguration.url;
            },
            set: function (url) {
                this.partialUpdate({ url: url });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "project", {
            get: function () {
                return this.internalConfiguration.project;
            },
            set: function (project) {
                this.partialUpdate({
                    project: project || "_",
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "localExp", {
            get: function () {
                return this.internalConfiguration.localExp;
            },
            set: function (localExp) {
                this.partialUpdate({ localExp: localExp });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Configuration.prototype, "persist", {
            get: function () {
                return this.internalConfiguration.persist;
            },
            set: function (persist) {
                this.internalConfiguration.persist = persist;
            },
            enumerable: true,
            configurable: true
        });
        // HELPER METHODS ============================================================
        /**
         * Update the configuration values, will also hydrate them if persistance activated
         * @param {IConfigurationValues} config
         */
        Configuration.prototype.update = function (config) {
            this.internalConfiguration = config;
            this.hydrate(config);
        };
        /**
         * Update partials of the configuration, behaves like the [update] method
         * @param {Partial<IConfigurationValues>} config
         */
        Configuration.prototype.partialUpdate = function (config) {
            this.internalConfiguration = __assign({}, this.internalConfiguration, config);
            this.hydrate(this.internalConfiguration);
        };
        /**
         * Reset the whole confiugration and remove hydrated values from storage as well
         */
        Configuration.prototype.reset = function () {
            delete this.internalConfiguration.token;
            delete this.internalConfiguration.url;
            delete this.internalConfiguration.localExp;
            this.internalConfiguration.project = "_";
            this.deleteHydratedConfig();
        };
        // STORAGE METHODS ===========================================================
        Configuration.prototype.dehydrate = function () {
            if (!this.storage || !this.persist) {
                return;
            }
            var nativeValue = this.storage.getItem(STORAGE_KEY);
            if (!nativeValue) {
                return;
            }
            var parsedConfig = JSON.parse(nativeValue);
            this.internalConfiguration = parsedConfig;
            return parsedConfig;
        };
        Configuration.prototype.hydrate = function (props) {
            if (!this.storage || !this.persist) {
                return;
            }
            this.storage.setItem(STORAGE_KEY, JSON.stringify(props));
        };
        Configuration.prototype.deleteHydratedConfig = function () {
            if (!this.storage || !this.persist) {
                return;
            }
            this.storage.removeItem(STORAGE_KEY);
        };
        Configuration.prototype.dehydratedInitialConfiguration = function (storage) {
            if (!storage) {
                return {};
            }
            var nativeValue = storage.getItem(STORAGE_KEY);
            if (!nativeValue) {
                return;
            }
            try {
                return JSON.parse(nativeValue);
            }
            catch (err) {
                return {};
            }
        };
        /**
         * Defaults for all directus sdk instances, can be modified if preferred
         * @type {IConfigurationDefaults}
         */
        Configuration.defaults = {
            project: "_",
            tokenExpirationTime: 5 * 6 * 1000,
        };
        return Configuration;
    }());

    /**
     * @module utils
     */
    var DIRECTUS_COLLECTION_PREFIX = "directus_";
    /**
     * Returns the correct API path for the collection. It will
     * strip the prefix {@link DIRECTUS_COLLECTION_PREFIX | collection-prefix} or will add the
     * '/items/' path as prefix if not provided. The 'substr(9)' defines
     * the length of the defined {@link DIRECTUS_COLLECTION_PREFIX | collection-prefix}.
     * @param {string} collection     The name of the collection
     * @returns {string}
     * @internal
     *
     * @example
     * getCollectionItemPath('directus_users');
     * // => '/users'
     * getCollectionItemPath('users');
     * // => '/items/users'
     */
    function getCollectionItemPath(collection) {
        if (collection.startsWith(DIRECTUS_COLLECTION_PREFIX)) {
            return "/" + collection.substr(9);
        }
        return "/items/" + collection;
    }

    /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
    (function(root) {

    	// Detect free variables `exports`.
    	var freeExports = typeof exports == 'object' && exports;

    	// Detect free variable `module`.
    	var freeModule = typeof module == 'object' && module &&
    		module.exports == freeExports && module;

    	// Detect free variable `global`, from Node.js or Browserified code, and use
    	// it as `root`.
    	var freeGlobal = typeof global == 'object' && global;
    	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    		root = freeGlobal;
    	}

    	/*--------------------------------------------------------------------------*/

    	var InvalidCharacterError = function(message) {
    		this.message = message;
    	};
    	InvalidCharacterError.prototype = new Error;
    	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

    	var error = function(message) {
    		// Note: the error messages used throughout this file match those used by
    		// the native `atob`/`btoa` implementation in Chromium.
    		throw new InvalidCharacterError(message);
    	};

    	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    	// http://whatwg.org/html/common-microsyntaxes.html#space-character
    	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

    	// `decode` is designed to be fully compatible with `atob` as described in the
    	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
    	// The optimized base64-decoding algorithm used is based on @atk’s excellent
    	// implementation. https://gist.github.com/atk/1020396
    	var decode = function(input) {
    		input = String(input)
    			.replace(REGEX_SPACE_CHARACTERS, '');
    		var length = input.length;
    		if (length % 4 == 0) {
    			input = input.replace(/==?$/, '');
    			length = input.length;
    		}
    		if (
    			length % 4 == 1 ||
    			// http://whatwg.org/C#alphanumeric-ascii-characters
    			/[^+a-zA-Z0-9/]/.test(input)
    		) {
    			error(
    				'Invalid character: the string to be decoded is not correctly encoded.'
    			);
    		}
    		var bitCounter = 0;
    		var bitStorage;
    		var buffer;
    		var output = '';
    		var position = -1;
    		while (++position < length) {
    			buffer = TABLE.indexOf(input.charAt(position));
    			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
    			// Unless this is the first of a group of 4 characters…
    			if (bitCounter++ % 4) {
    				// …convert the first 8 bits to a single ASCII character.
    				output += String.fromCharCode(
    					0xFF & bitStorage >> (-2 * bitCounter & 6)
    				);
    			}
    		}
    		return output;
    	};

    	// `encode` is designed to be fully compatible with `btoa` as described in the
    	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
    	var encode = function(input) {
    		input = String(input);
    		if (/[^\0-\xFF]/.test(input)) {
    			// Note: no need to special-case astral symbols here, as surrogates are
    			// matched, and the input is supposed to only contain ASCII anyway.
    			error(
    				'The string to be encoded contains characters outside of the ' +
    				'Latin1 range.'
    			);
    		}
    		var padding = input.length % 3;
    		var output = '';
    		var position = -1;
    		var a;
    		var b;
    		var c;
    		var buffer;
    		// Make sure any padding is handled outside of the loop.
    		var length = input.length - padding;

    		while (++position < length) {
    			// Read three bytes, i.e. 24 bits.
    			a = input.charCodeAt(position) << 16;
    			b = input.charCodeAt(++position) << 8;
    			c = input.charCodeAt(++position);
    			buffer = a + b + c;
    			// Turn the 24 bits into four chunks of 6 bits each, and append the
    			// matching character for each of them to the output.
    			output += (
    				TABLE.charAt(buffer >> 18 & 0x3F) +
    				TABLE.charAt(buffer >> 12 & 0x3F) +
    				TABLE.charAt(buffer >> 6 & 0x3F) +
    				TABLE.charAt(buffer & 0x3F)
    			);
    		}

    		if (padding == 2) {
    			a = input.charCodeAt(position) << 8;
    			b = input.charCodeAt(++position);
    			buffer = a + b;
    			output += (
    				TABLE.charAt(buffer >> 10) +
    				TABLE.charAt((buffer >> 4) & 0x3F) +
    				TABLE.charAt((buffer << 2) & 0x3F) +
    				'='
    			);
    		} else if (padding == 1) {
    			buffer = input.charCodeAt(position);
    			output += (
    				TABLE.charAt(buffer >> 2) +
    				TABLE.charAt((buffer << 4) & 0x3F) +
    				'=='
    			);
    		}

    		return output;
    	};

    	var base64 = {
    		'encode': encode,
    		'decode': decode,
    		'version': '0.1.0'
    	};

    	// Some AMD build optimizers, like r.js, check for specific condition patterns
    	// like the following:
    	if (
    		typeof define == 'function' &&
    		typeof define.amd == 'object' &&
    		define.amd
    	) {
    		define(function() {
    			return base64;
    		});
    	}	else if (freeExports && !freeExports.nodeType) {
    		if (freeModule) { // in Node.js or RingoJS v0.8.0+
    			freeModule.exports = base64;
    		} else { // in Narwhal or RingoJS v0.7.0-
    			for (var key in base64) {
    				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
    			}
    		}
    	} else { // in Rhino or a web browser
    		root.base64 = base64;
    	}

    }(undefined));

    var base64 = /*#__PURE__*/Object.freeze({

    });

    /**
     * @module utils
     */
    /**
     * @internal
     */
    var isType = function (t, v) { return Object.prototype.toString.call(v) === "[object " + t + "]"; };
    /**
     * @internal
     */
    var isString = function (v) { return v && typeof v === "string" && /\S/.test(v); };
    /**
     * @internal
     */
    var isNumber = function (v) { return isType("Number", v) && isFinite(v) && !isNaN(parseFloat(v)); };
    /**
     * @internal
     */
    var isFunction = function (v) { return v instanceof Function; };
    /**
     * @internal
     */
    var isObjectOrEmpty = function (v) { return isType("Object", v); };
    /**
     * @internal
     */
    var isObject = function (v) {
        if (!isObjectOrEmpty(v)) {
            return false;
        }
        for (var key in v) {
            if (Object.prototype.hasOwnProperty.call(v, key)) {
                return true;
            }
        }
        return false;
    };

    /**
     * @module utils
     */
    /**
     * Retrieves the payload from a JWT
     * @internal
     * @param  {String} token The JWT to retrieve the payload from
     * @return {Object}       The JWT payload
     */
    function getPayload(token) {
        if (!token || token.length < 0 || token.split(".").length <= 0) {
            // no token or invalid token equals no payload
            return {};
        }
        try {
            var payloadBase64 = token
                .split(".")[1]
                .replace("-", "+")
                .replace("_", "/");
            var payloadDecoded = undefined(payloadBase64);
            var payloadObject = JSON.parse(payloadDecoded);
            if (isNumber(payloadObject.exp)) {
                payloadObject.exp = new Date(payloadObject.exp * 1000);
            }
            return payloadObject;
        }
        catch (err) {
            // return empty payload in case of an error
            return {};
        }
    }

    /**
     * @module Authentication
     */
    /**
     * Handles all authentication related logic, decoupled from the core
     * @internal
     * @author Jan Biasi <biasijan@gmail.com>
     */
    var Authentication = /** @class */ (function () {
        /**
         * Creates a new authentication instance
         * @constructor
         * @param {IConfiguration} config
         * @param {IAuthenticationInjectableProps} inject
         */
        function Authentication(config, inject) {
            this.config = config;
            this.inject = inject;
            // Only start the auto refresh interval if the token exists and it's a JWT
            if (config.token && config.token.includes(".")) {
                this.startInterval(true);
            }
        }
        /**
         * If the current auth status is logged in
         * @return {boolean}
         */
        Authentication.prototype.isLoggedIn = function () {
            if (isString(this.config.token) &&
                isString(this.config.url) &&
                isString(this.config.project) &&
                isObject(this.getPayload())) {
                if (this.config.localExp > Date.now()) {
                    // Not expired, succeed
                    return true;
                }
            }
            return false;
        };
        /**
         * Login to the API; Gets a new token from the API and stores it in this.token.
         * @param {ILoginCredentials} credentials   User login credentials
         * @param {ILoginOptions?} options          Additional options regarding persistance and co.
         * @return {Promise<ILoginResponse>}
         */
        Authentication.prototype.login = function (credentials, options) {
            var _this = this;
            this.config.token = null;
            if (isString(credentials.url)) {
                this.config.url = credentials.url;
            }
            if (isString(credentials.project)) {
                this.config.project = credentials.project;
            }
            if (credentials.persist || (options && options.persist) || this.config.persist) {
                // use interval for login refresh when option persist enabled
                this.startInterval();
            }
            return new Promise(function (resolve, reject) {
                _this.inject
                    .post("/auth/authenticate", {
                    email: credentials.email,
                    password: credentials.password,
                })
                    .then(function (res) {
                    // save new token in configuration
                    return (_this.config.token = res.data.token);
                })
                    .then(function (token) {
                    // expiry date is the moment we got the token + 5 minutes
                    _this.config.localExp = new Date(Date.now() + _this.config.tokenExpirationTime).getTime();
                    resolve({
                        localExp: _this.config.localExp,
                        project: _this.config.project,
                        token: token,
                        url: _this.config.url,
                    });
                })
                    .catch(reject);
            });
        };
        /**
         * Logs the user out by "forgetting" the token, and clearing the refresh interval
         */
        Authentication.prototype.logout = function () {
            this.config.reset();
            if (this.refreshInterval) {
                this.stopInterval();
            }
        };
        /// REFRESH METHODS ----------------------------------------------------------
        /**
         * Refresh the token if it is about to expire (within 30 seconds of expiry date).
         * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
         * - Calls onAutoRefreshError if refreshing the token fails for some reason.
         * @return {RefreshIfNeededResponse}
         */
        Authentication.prototype.refreshIfNeeded = function () {
            var _this = this;
            var payload = this.getPayload();
            var _a = this.config, token = _a.token, url = _a.url, project = _a.project, localExp = _a.localExp;
            if (!isString(token) || !isString(url) || !isString(project)) {
                return;
            }
            if (!payload || !payload.exp) {
                return;
            }
            var timeDiff = (localExp || 0) - Date.now();
            if (timeDiff <= 0) {
                // token has expired, skipping auto refresh
                if (isFunction(this.onAutoRefreshError)) {
                    this.onAutoRefreshError({
                        code: 102,
                        message: "auth_expired_token",
                    });
                }
                return;
            }
            if (timeDiff < 30000) {
                return new Promise(function (resolve) {
                    _this.refresh(token)
                        .then(function (res) {
                        _this.config.localExp = new Date(Date.now() + _this.config.tokenExpirationTime).getTime();
                        _this.config.token = res.data.token || token;
                        // if autorefresh succeeded
                        if (isFunction(_this.onAutoRefreshSuccess)) {
                            _this.onAutoRefreshSuccess(_this.config);
                        }
                        resolve([true]);
                    })
                        .catch(function (error) {
                        if (isFunction(_this.onAutoRefreshError)) {
                            _this.onAutoRefreshError(error);
                        }
                        resolve([true, error]);
                    });
                });
            }
        };
        /**
         * Use the passed token to request a new one.
         * @param {string} token
         */
        Authentication.prototype.refresh = function (token) {
            return this.inject.post("/auth/refresh", { token: token });
        };
        /**
         * Starts an interval of 10 seconds that will check if the token needs refreshing
         * @param {boolean?} fireImmediately    If it should immediately call [refreshIfNeeded]
         */
        Authentication.prototype.startInterval = function (fireImmediately) {
            if (fireImmediately) {
                this.refreshIfNeeded();
            }
            this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
        };
        /**
         * Clears and nullifies the token refreshing interval
         */
        Authentication.prototype.stopInterval = function () {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        };
        /**
         * Gets the payload of the current token, return type can be generic
         * @typeparam T     The payload response type, arbitrary object
         * @return {T}
         */
        Authentication.prototype.getPayload = function () {
            if (!isString(this.config.token)) {
                return null;
            }
            return getPayload(this.config.token);
        };
        return Authentication;
    }());

    var defaultSerializeTransform = function (key, value) { return key + "=" + value; };
    function querify(obj, prefix, serializer) {
        if (serializer === void 0) { serializer = defaultSerializeTransform; }
        var qs = [], prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var key = prefix ? prefix + "[" + prop + "]" : prop;
                var val = obj[prop];
                qs.push((val !== null && typeof val === "object")
                    ? querify(val, key)
                    : serializer(key, val));
            }
        }
        return qs.join('');
    }

    if (typeof module === 'undefined' || !module.exports) {
        // include polyfills for browser only
        require('whatwg-fetch');
    }
    function withTimeout(fn, timeout) {
        return Promise.race([
            fn(),
            new Promise(function (_resolve, reject) {
                setTimeout(function () { return reject(new Error("Timeout of " + timeout + " reached")); }, timeout);
            })
        ]);
    }
    function request(opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!opts) {
                            throw new Error("Invalid request options: " + opts);
                        }
                        url = opts.url;
                        if (opts.baseURL) {
                            url = opts.baseURL + "/" + url;
                        }
                        if (opts.params) {
                            url = url + "?" + querify(opts.params);
                        }
                        if (opts.body && typeof opts.body !== 'string') {
                            opts.body = JSON.stringify(opts.body);
                        }
                        return [4 /*yield*/, withTimeout(function () { return fetch(url, {
                                method: opts.method,
                                body: opts.body,
                                headers: opts.headers,
                                credentials: opts.credentials || 'omit'
                            }); }, opts.timeout || 2000)];
                    case 1:
                        response = _a.sent();
                        if (!(opts && opts.skipToJSON)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4: 
                    // return parsed values
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    }

    /**
     * @module API
     */
    var APIError = /** @class */ (function (_super) {
        __extends(APIError, _super);
        function APIError(message, info) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.info = info;
            Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain
            return _this;
        }
        Object.defineProperty(APIError.prototype, "url", {
            get: function () {
                return this.info.url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIError.prototype, "method", {
            get: function () {
                return this.info.method.toUpperCase();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIError.prototype, "code", {
            get: function () {
                return "" + (this.info.code || -1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(APIError.prototype, "params", {
            get: function () {
                return this.info.params || {};
            },
            enumerable: true,
            configurable: true
        });
        APIError.prototype.toString = function () {
            return [
                'Directus call failed:',
                this.method + " " + this.url + " " + JSON.stringify(this.params) + " -",
                this.message,
                "(code " + this.code + ")"
            ].join(' ');
        };
        return APIError;
    }(Error));
    /**
     * API definition for HTTP transactions
     * @uses Authentication
     * @uses axios
     * @author Jan Biasi <biasijan@gmail.com>
     */
    var API = /** @class */ (function () {
        function API(config) {
            this.config = config;
            // make request function public
            this.fetch = request;
            this.auth = new Authentication(config, {
                post: this.post.bind(this),
            });
        }
        /**
         * Resets the client instance by logging out and removing the URL and project
         */
        API.prototype.reset = function () {
            this.auth.logout();
            this.config.deleteHydratedConfig();
        };
        /// REQUEST METHODS ----------------------------------------------------------
        /**
         * GET convenience method. Calls the request method for you
         * @typeparam T   response type
         * @return {Promise<T>}
         */
        API.prototype.get = function (endpoint, params) {
            if (params === void 0) { params = {}; }
            return this.request("get", endpoint, params);
        };
        /**
         * POST convenience method. Calls the request method for you
         * @typeparam T   response type
         * @return {Promise<T>}
         */
        API.prototype.post = function (endpoint, body, params) {
            if (body === void 0) { body = {}; }
            if (params === void 0) { params = {}; }
            return this.request("post", endpoint, params, body);
        };
        /**
         * PATCH convenience method. Calls the request method for you
         * @typeparam T   response type
         * @return {Promise<T>}
         */
        API.prototype.patch = function (endpoint, body, params) {
            if (body === void 0) { body = {}; }
            if (params === void 0) { params = {}; }
            return this.request("patch", endpoint, params, body);
        };
        /**
         * PUT convenience method. Calls the request method for you
         * @typeparam T   response type
         * @return {Promise<T>}
         */
        API.prototype.put = function (endpoint, body, params) {
            if (body === void 0) { body = {}; }
            if (params === void 0) { params = {}; }
            return this.request("put", endpoint, params, body);
        };
        /**
         * DELETE convenience method. Calls the request method for you
         * @typeparam T   response type
         * @return {Promise<T>}
         */
        API.prototype.delete = function (endpoint) {
            return this.request("delete", endpoint);
        };
        /**
         * Gets the payload of the current token, return type can be generic
         * @typeparam T   extends object, payload type
         * @return {Promise<T>}
         */
        API.prototype.getPayload = function () {
            if (!isString(this.config.token)) {
                return null;
            }
            return getPayload(this.config.token);
        };
        /**
         * Perform an API request to the Directus API
         * @param {RequestMethod} method    Selected HTTP method
         * @param {string} endpoint         Endpoint definition as path
         * @param {object={}} params        Query parameters
         * @param {object={}} data          Data passed to directus
         * @param {boolean=false} noEnv     Do not include the `env` in the url (for system calls)
         * @param {object={}} headers       Optional headers to include
         * @param {boolean=false} skipParseToJSON  Whether to skip `JSON.parse` or not
         * @typeparam T                     Response type definition, defaults to `any`
         * @return {Promise<T>}
         */
        API.prototype.request = function (method, endpoint, params, data, noEnv, headers, skipToJSON) {
            if (params === void 0) { params = {}; }
            if (data === void 0) { data = {}; }
            if (noEnv === void 0) { noEnv = false; }
            if (headers === void 0) { headers = {}; }
            if (skipToJSON === void 0) { skipToJSON = false; }
            if (!this.config.url) {
                throw new Error('API has no URL configured to send requests to, please check the docs.');
            }
            var baseURL = this.config.url + "/";
            if (noEnv === false) {
                baseURL += this.config.project + "/";
            }
            if (this.config.token && isString(this.config.token) && this.config.token.length > 0) {
                headers.Authorization = "Bearer " + this.config.token;
            }
            return this.fetch({
                method: method,
                url: endpoint,
                body: data,
                baseURL: baseURL,
                headers: headers,
                params: params,
                skipToJSON: skipToJSON
            });
            // return this.xhr
            //   .request(requestOptions)
            //   .then((res: { data: any }) => res.data)
            //   .then((responseData: any) => {
            //     if (!responseData || responseData.length === 0) {
            //       return responseData;
            //     }
            //     if (typeof responseData !== "object") {
            //       try {
            //         return skipParseToJSON ? responseData : JSON.parse(responseData);
            //       } catch (error) {
            //         throw {
            //           data: responseData,
            //           error,
            //           json: true,
            //         };
            //       }
            //     }
            //     return responseData as T;
            //   })
            //   .catch((error?: IErrorResponse) => {
            //     const errorResponse: IErrorResponse['response'] = error
            //       ? error.response || {} as IErrorResponse['response']
            //       : {} as IErrorResponse['response'];
            //     const errorResponseData: IErrorResponseData =
            //       errorResponse.data || {} as IErrorResponseData;
            //     const baseErrorInfo = {
            //       error,
            //       url: requestOptions.url,
            //       method: requestOptions.method,
            //       params: requestOptions.params,
            //       code: errorResponseData.error ? errorResponseData.error.code || error.code : -1
            //     }
            //     if (error.response) {
            //       throw new APIError(errorResponseData.error.message || 'Unknown error occured', baseErrorInfo);
            //     } else if (error.response && error.response.json === true) {
            //       throw new APIError("API returned invalid JSON", {
            //         ...baseErrorInfo,
            //         code: 422
            //       });
            //     } else {
            //       throw new APIError("Network error", {
            //         ...baseErrorInfo,
            //         code: -1
            //       });
            //     }
            //   });
        };
        return API;
    }());

    /**
     * @module SDK
     */
    /**
     * Main SDK implementation provides the public API to interact with a
     * remote directus instance.
     * @uses API
     * @uses Configuration
     */
    var SDK = /** @class */ (function () {
        // create a new instance with an API
        function SDK(options) {
            this.config = new Configuration(options);
            this.api = new API(this.config);
        }
        Object.defineProperty(SDK.prototype, "loggedIn", {
            get: function () {
                return this.api.auth.isLoggedIn();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SDK.prototype, "payload", {
            get: function () {
                if (!this.config.token) {
                    return null;
                }
                return this.api.getPayload();
            },
            enumerable: true,
            configurable: true
        });
        // #region authentication
        /**
         * Login to the API; Gets a new token from the API and stores it in this.api.token.
         */
        SDK.prototype.login = function (credentials, options) {
            return this.api.auth.login(credentials, options);
        };
        /**
         * Logs the user out by "forgetting" the token, and clearing the refresh interval
         */
        SDK.prototype.logout = function () {
            this.api.auth.logout();
        };
        /**
         * Resets the client instance by logging out and removing the URL and project
         */
        SDK.prototype.reset = function () {
            this.api.reset();
        };
        /**
         * Refresh the token if it is about to expire (within 30 seconds of expiry date).
         * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
         * - Calls onAutoRefreshError if refreshing the token fails for some reason.
         * @returns {[boolean, Error?]}
         */
        SDK.prototype.refreshIfNeeded = function () {
            return this.api.auth.refreshIfNeeded();
        };
        /**
         * Use the passed token to request a new one
         */
        SDK.prototype.refresh = function (token) {
            return this.api.auth.refresh(token);
        };
        /**
         * Request to reset the password of the user with the given email address.
         * The API will send an email to the given email address with a link to generate a new
         * temporary password.
         */
        SDK.prototype.requestPasswordReset = function (email) {
            return this.api.post("/auth/password/request", {
                email: email,
            });
        };
        // #endregion authentication
        // #endregion collection presets
        // #region activity
        /**
         * Get activity
         */
        SDK.prototype.getActivity = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/activity", params);
        };
        // #endregion activity
        // #region bookmarks
        /**
         * Get the bookmarks of the current user
         * @deprecated Will be removed in the next major version, please use {@link SDK.getCollectionPresets} instead
         * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
         */
        SDK.prototype.getMyBookmarks = function (params) {
            if (params === void 0) { params = {}; }
            return this.getCollectionPresets(params);
        };
        // #endregion bookmarks
        // #region collections
        /**
         * Get all available collections
         */
        SDK.prototype.getCollections = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/collections", params);
        };
        /**
         * Get collection info by name
         */
        SDK.prototype.getCollection = function (collection, params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/collections/" + collection, params);
        };
        /**
         * Create a collection
         */
        SDK.prototype.createCollection = function (data) {
            return this.api.post("/collections", data);
        };
        /**
         * Updates a certain collection
         */
        SDK.prototype.updateCollection = function (collection, data) {
            return this.api.patch("/collections/" + collection, data);
        };
        /**
         * Deletes a certain collection
         */
        SDK.prototype.deleteCollection = function (collection) {
            return this.api.delete("/collections/" + collection);
        };
        // #endregion collections
        // #region collection presets
        /**
         * Get the collection presets of the current user
         * @see https://docs.directus.io/api/reference.html#collection-presets
         */
        SDK.prototype.getCollectionPresets = function (params) {
            var payload = this.api.getPayload();
            return Promise.all([
                this.api.get("/collection_presets", {
                    "filter[title][nnull]": 1,
                    "filter[user][eq]": payload.id,
                }),
                this.api.get("/collection_presets", {
                    "filter[role][eq]": payload.role,
                    "filter[title][nnull]": 1,
                    "filter[user][null]": 1,
                }),
            ]).then(function (values) {
                var user = values[0], role = values[1];
                return (user.data || []).concat((role.data || []));
            });
        };
        /**
         * Create a new collection preset (bookmark / listing preferences)
         * @see https://docs.directus.io/api/reference.html#collection-presets
         */
        SDK.prototype.createCollectionPreset = function (data) {
            return this.api.post("/collection_presets", data);
        };
        /**
         * Update collection preset (bookmark / listing preference)
         * @see https://docs.directus.io/api/reference.html#collection-presets
         */
        // tslint:disable-next-line: max-line-length
        SDK.prototype.updateCollectionPreset = function (primaryKey, data) {
            return this.api.patch("/collection_presets/" + primaryKey, data);
        };
        /**
         * Delete collection preset by primarykey
         * @see https://docs.directus.io/api/reference.html#collection-presets
         */
        SDK.prototype.deleteCollectionPreset = function (primaryKey) {
            return this.api.delete("/collection_presets/" + primaryKey);
        };
        // #endregion collection presets
        // #region extensions
        /**
         * Get the information of all installed interfaces
         * @see https://docs.directus.io/api/reference.html#get-extensions
         */
        SDK.prototype.getInterfaces = function () {
            return this.api.request("get", "/interfaces", {}, {}, true);
        };
        /**
         * Get the information of all installed layouts
         * @see https://docs.directus.io/api/reference.html#get-extensions
         */
        SDK.prototype.getLayouts = function () {
            return this.api.request("get", "/layouts", {}, {}, true);
        };
        /**
         * Get the information of all installed pages
         * @see https://docs.directus.io/api/reference.html#get-extensions
         */
        SDK.prototype.getPages = function () {
            return this.api.request("get", "/pages", {}, {}, true);
        };
        // #endregion extensions
        // #region fields
        /**
         * Get all fields that are in Directus
         * @see https://docs.directus.io/api/reference.html#fields-2
         */
        SDK.prototype.getAllFields = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/fields", params);
        };
        /**
         * Get the fields that have been setup for a given collection
         * @see https://docs.directus.io/api/reference.html#fields-2
         */
        SDK.prototype.getFields = function (collection, params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/fields/" + collection, params);
        };
        /**
         * Get the field information for a single given field
         * @see https://docs.directus.io/api/reference.html#fields-2
         */
        SDK.prototype.getField = function (collection, fieldName, params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/fields/" + collection + "/" + fieldName, params);
        };
        /**
         * Create a field in the given collection
         * @see https://docs.directus.io/api/reference.html#fields-2
         */
        SDK.prototype.createField = function (collection, fieldInfo) {
            return this.api.post("/fields/" + collection, fieldInfo);
        };
        /**
         * Update a given field in a given collection
         * @see https://docs.directus.io/api/reference.html#fields-2
         */
        SDK.prototype.updateField = function (collection, fieldName, fieldInfo) {
            return this.api.patch("/fields/" + collection + "/" + fieldName, fieldInfo);
        };
        SDK.prototype.updateFields = function (collection, fieldsInfoOrFieldNames, fieldInfo) {
            if (fieldInfo === void 0) { fieldInfo = null; }
            if (fieldInfo) {
                return this.api.patch("/fields/" + collection + "/" + fieldsInfoOrFieldNames.join(","), fieldInfo);
            }
            return this.api.patch("/fields/" + collection, fieldsInfoOrFieldNames);
        };
        /**
         * Delete a field from a collection
         * @see @see https://docs.directus.io/api/reference.html#fields-2
         */
        SDK.prototype.deleteField = function (collection, fieldName) {
            return this.api.delete("/fields/" + collection + "/" + fieldName);
        };
        // #endregion fields
        // #region files
        /**
         * Get a list of available files from Directus
         * @see https://docs.directus.io/api/reference.html#files
         */
        SDK.prototype.getFiles = function (params) {
            if (params === void 0) { params = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.api.get("/files", params)];
                });
            });
        };
        /**
         * Get a certain file or certain file list from Directus
         * @see https://docs.directus.io/api/reference.html#files
         */
        SDK.prototype.getFile = function (fileName, params) {
            if (params === void 0) { params = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var files;
                return __generator(this, function (_a) {
                    files = typeof fileName === "string" ? fileName : fileName.join(",");
                    return [2 /*return*/, this.api.get("/files/" + files, params)];
                });
            });
        };
        /**
         * Upload multipart files in multipart/form-data
         * @see https://docs.directus.io/api/reference.html#files
         */
        SDK.prototype.uploadFiles = function (data, // TODO: fix type definition
        _onUploadProgress // TODO: deprecate with fetch as streams are experimental (see W3C)
        ) {
            var headers = {
                Authorization: "Bearer " + this.config.token,
                "Content-Type": "multipart/form-data",
            };
            var filesURL = this.config.url + "/" + this.config.project + "/files";
            return request({
                method: 'post',
                url: filesURL, body: data,
                headers: headers
            });
            // return this.api.xhr
            //   .post(`${this.config.url}/${this.config.project}/files`, data, {
            //     headers,
            //     onUploadProgress,
            //   })
            //   .then((res: { data: any }) => {
            //     // detach concurrency manager
            //     this.api.concurrent.detach();
            //     return res.data;
            //   })
            //   .catch((error: IErrorResponse) => {
            //     // detach concurrency manager
            //     this.api.concurrent.detach();
            //     if (error.response) {
            //       throw error.response.data.error;
            //     } else {
            //       throw {
            //         code: -1,
            //         error,
            //         message: "Network Error",
            //       };
            //     }
            //   });
        };
        // #endregion files
        // #region items
        /**
         * Update an existing item
         * @see https://docs.directus.io/api/reference.html#update-item
         * @typeparam TTPartialItem Defining the item type in object schema
         * @typeparam TTResult Extension of [TPartialItem] as expected result
         */
        SDK.prototype.updateItem = function (collection, primaryKey, body, params) {
            if (params === void 0) { params = {}; }
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.patch(collectionBasePath + "/" + primaryKey, body, params);
        };
        /**
         * Update multiple items
         * @see https://docs.directus.io/api/reference.html#update-items
         * @typeparam TPartialItem Defining an array of items, each in object schema
         * @typeparam TResult Extension of [TPartialItem] as expected result
         * @return {Promise<IItemsResponse<TPartialItem & TResult>>}
         */
        SDK.prototype.updateItems = function (collection, body, params) {
            if (params === void 0) { params = {}; }
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.patch(collectionBasePath, body, params);
        };
        /**
         * Create a new item
         * @typeparam TItemType Defining an item and its fields in object schema
         * @return {Promise<IItemsResponse<TItemType>>}
         */
        SDK.prototype.createItem = function (collection, body) {
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.post(collectionBasePath, body);
        };
        /**
         * Create multiple items
         * @see https://docs.directus.io/api/reference.html#create-items
         * @typeparam TItemsType Defining an array of items, each in object schema
         */
        SDK.prototype.createItems = function (collection, body) {
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.post(collectionBasePath, body);
        };
        /**
         * Get items from a given collection
         * @see https://docs.directus.io/api/reference.html#get-multiple-items
         * @typeparam TItemsType Defining an array of items, each in object schema
         */
        SDK.prototype.getItems = function (collection, params) {
            if (params === void 0) { params = {}; }
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.get(collectionBasePath, params);
        };
        /**
         * Get a single item by primary key
         * @see https://docs.directus.io/api/reference.html#get-item
         * @typeparam TItemType Defining fields of an item in object schema
         */
        SDK.prototype.getItem = function (collection, primaryKey, params) {
            if (params === void 0) { params = {}; }
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.get(collectionBasePath + "/" + primaryKey, params);
        };
        /**
         * Delete a single item by primary key
         * @see https://docs.directus.io/api/reference.html#delete-items
         */
        SDK.prototype.deleteItem = function (collection, primaryKey) {
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.delete(collectionBasePath + "/" + primaryKey);
        };
        /**
         * Delete multiple items by primary key
         * @see https://docs.directus.io/api/reference.html#delete-items
         */
        SDK.prototype.deleteItems = function (collection, primaryKeys) {
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.delete(collectionBasePath + "/" + primaryKeys.join());
        };
        // #endregion items
        // #region listing preferences
        /**
         * Get the collection presets of the current user for a single collection
         */
        SDK.prototype.getMyListingPreferences = function (collection, params) {
            var payload = this.api.getPayload();
            return Promise.all([
                this.api.get("/collection_presets", {
                    "filter[collection][eq]": collection,
                    "filter[role][null]": 1,
                    "filter[title][null]": 1,
                    "filter[user][null]": 1,
                    limit: 1,
                    sort: "-id",
                }),
                this.api.get("/collection_presets", {
                    "filter[collection][eq]": collection,
                    "filter[role][eq]": payload.role,
                    "filter[title][null]": 1,
                    "filter[user][null]": 1,
                    limit: 1,
                    sort: "-id",
                }),
                this.api.get("/collection_presets", {
                    "filter[collection][eq]": collection,
                    "filter[role][eq]": payload.role,
                    "filter[title][null]": 1,
                    "filter[user][eq]": payload.id,
                    limit: 1,
                    sort: "-id",
                }),
            ]).then(function (values) {
                var col = values[0], role = values[1], user = values[2];
                if (user.data && user.data.length > 0) {
                    return user.data[0];
                }
                if (role.data && role.data.length > 0) {
                    return role.data[0];
                }
                if (col.data && col.data.length > 0) {
                    return col.data[0];
                }
                return {};
            });
        };
        // #endregion listing preferences
        // #region permissions
        /**
         * Get permissions
         * @param {QueryParamsType?} params
         * @return {Promise<IPermission>}
         */
        SDK.prototype.getPermissions = function (params) {
            if (params === void 0) { params = {}; }
            return this.getItems("directus_permissions", params);
        };
        /**
         * TODO: Fix type-def for return
         * Get the currently logged in user's permissions
         * @typeparam TResponse Permissions type as array extending any[]
         */
        SDK.prototype.getMyPermissions = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/permissions/me", params);
        };
        /**
         * TODO: Fix type-def for param and return
         * Create multiple new permissions
         * @typeparam TResponse Permissions type as array extending any[]
         */
        SDK.prototype.createPermissions = function (data) {
            return this.api.post("/permissions", data);
        };
        /**
         * TODO: Fix type-def for param and return
         * Update multiple permission records
         * @typeparam TResponse Permissions type as array extending any[]
         */
        SDK.prototype.updatePermissions = function (data) {
            return this.api.patch("/permissions", data);
        };
        // #endregion permissions
        // #region relations
        /**
         * Get all relationships
         * @param {QueryParamsType?} params
         * @return {Promise<IRelationsResponse>}
         */
        SDK.prototype.getRelations = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/relations", params);
        };
        /**
         * Creates new relation
         * @param {IRelation} data
         * @return {Promise<IRelationResponse>}
         */
        SDK.prototype.createRelation = function (data) {
            return this.api.post("/relations", data);
        };
        /**
         * Updates existing relation
         */
        SDK.prototype.updateRelation = function (primaryKey, data) {
            return this.api.patch("/relations/" + primaryKey, data);
        };
        /**
         * TODO: Add type-def for return value(s)
         * Get the relationship information for the given collection
         */
        SDK.prototype.getCollectionRelations = function (collection, params) {
            return Promise.all([
                this.api.get("/relations", {
                    "filter[collection_a][eq]": collection,
                }),
                this.api.get("/relations", {
                    "filter[collection_b][eq]": collection,
                }),
            ]);
        };
        // #endregion relations
        // #region revisions
        /**
         * Get a single item's revisions by primary key
         * @typeparam DataAndDelta  The data including delta type for the revision
         * @param {string} collection
         * @param {PrimaryKeyType} primaryKey
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getItemRevisions = function (collection, primaryKey, params) {
            if (params === void 0) { params = {}; }
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.get(collectionBasePath + "/" + primaryKey + "/revisions", params);
        };
        /**
         * Revert an item to a previous state
         * @param {string} collection
         * @param {PrimaryKeyType} primaryKey
         * @param {number} revisionID
         */
        SDK.prototype.revert = function (collection, primaryKey, revisionID) {
            var collectionBasePath = getCollectionItemPath(collection);
            return this.api.patch(collectionBasePath + "/" + primaryKey + "/revert/" + revisionID);
        };
        // #endregion revisions
        // #region roles
        /**
         * Get a single user role
         * @param {PrimaryKeyType} primaryKey
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getRole = function (primaryKey, params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/roles/" + primaryKey, params);
        };
        /**
         * Get the user roles
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getRoles = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/roles", params);
        };
        /**
         * Update a user role
         * @param {PrimaryKeyType} primaryKey
         * @param {Role} body
         */
        SDK.prototype.updateRole = function (primaryKey, body) {
            return this.updateItem("directus_roles", primaryKey, body);
        };
        /**
         * Create a new user role
         * @param {Role} body
         */
        SDK.prototype.createRole = function (body) {
            return this.createItem("directus_roles", body);
        };
        /**
         * Delete a user rol by primary key
         * @param {PrimaryKeyType} primaryKey
         */
        SDK.prototype.deleteRole = function (primaryKey) {
            return this.deleteItem("directus_roles", primaryKey);
        };
        // #endregion roles
        // #region settings
        /**
         * Get Directus' global settings
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getSettings = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/settings", params);
        };
        /**
         * Get the "fields" for directus_settings
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getSettingsFields = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/settings/fields", params);
        };
        // #endregion settings
        // #region users
        /**
         * Get a list of available users in Directus
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getUsers = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/users", params);
        };
        /**
         * Get a single Directus user
         * @param {PrimaryKeyType} primaryKey
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getUser = function (primaryKey, params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/users/" + primaryKey, params);
        };
        /**
         * Get the user info of the currently logged in user
         * @param {QueryParamsType?} params
         */
        SDK.prototype.getMe = function (params) {
            if (params === void 0) { params = {}; }
            return this.api.get("/users/me", params);
        };
        /**
         * Update a single user based on primaryKey
         * @param {PrimaryKeyType} primaryKey
         * @param {QueryParamsType?} params
         */
        SDK.prototype.updateUser = function (primaryKey, body) {
            return this.updateItem("directus_users", primaryKey, body);
        };
        // #endregion users
        // #region server admin
        /**
         * This will update the database of the API instance to the latest version
         * using the migrations in the API
         * @return {Promise<void>}
         */
        SDK.prototype.updateDatabase = function () {
            return this.api.post("/update");
        };
        /**
         * Ping the API to check if it exists / is up and running, returns "pong"
         * @return {Promise<string>}
         */
        SDK.prototype.ping = function () {
            return this.api.request("get", "/server/ping", {}, {}, true, {}, true);
        };
        /**
         * Get the server info from the API
         * @return {Promise<IServerInformationResponse>}
         */
        SDK.prototype.serverInfo = function () {
            return this.api.request("get", "/", {}, {}, true);
        };
        /**
         * TODO: Add response type-def
         * Get the server info from the project
         * @return {Promise<any>}
         */
        SDK.prototype.projectInfo = function () {
            return this.api.request("get", "/");
        };
        /**
         * TODO: Add response type-def
         * Get all the setup third party auth providers
         * @return {Promise<any>}
         */
        SDK.prototype.getThirdPartyAuthProviders = function () {
            return this.api.get("/auth/sso");
        };
        // convenience method
        SDK.getPayload = getPayload;
        return SDK;
    }());

    /**
     * @module exports
     */

    exports.Configuration = Configuration;
    exports.SDK = SDK;
    exports.default = SDK;
    exports.getCollectionItemPath = getCollectionItemPath;
    exports.getPayload = getPayload;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=directus-sdk.js.map