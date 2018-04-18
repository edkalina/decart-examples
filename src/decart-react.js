import React from "react";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

var inherits = function(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
};

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
};

function _getStateValue(instance, key) {
  return instance.state[key];
}

function _initStateValue(instance, key, value) {
  var _babelHelpers$extends;

  var state = instance.state;

  instance.state = _extends(
    {},
    state,
    ((_babelHelpers$extends = {}),
    (_babelHelpers$extends[key] = _extends({}, state[key], value)),
    _babelHelpers$extends)
  );
}

function _setStateValue(instance, key, update, callback) {
  var _instance$setState;

  if (typeof update === "function") {
    instance.setState(function(state) {
      var _ref;

      return (
        (_ref = {}),
        (_ref[key] = _extends({}, state[key], update(state[key]))),
        _ref
      );
    }, callback);

    return;
  }

  instance.setState(
    ((_instance$setState = {}),
    (_instance$setState[key] = _extends({}, instance.state[key], update)),
    _instance$setState),
    callback
  );
}

function createApiMaster(instance) {
  var listeners = {};

  return {
    scopeTo: function scopeTo(key) {
      var lastVals = null;
      var shouldMemoizeVals = false;

      var publicApi = {
        get vals() {
          if (!shouldMemoizeVals) {
            throw new Error("Vals memoization is not enabled for " + key);
          }

          return lastVals;
        },

        enableValsMemoization: function enableValsMemoization() {
          shouldMemoizeVals = true;
        },
        getStateValue: function getStateValue() {
          return _getStateValue(instance, key);
        },
        initStateValue: function initStateValue(value) {
          return _initStateValue(instance, key, value);
        },
        setStateValue: function setStateValue(update, callback) {
          return _setStateValue(instance, key, update, callback);
        },
        getSharedValue: function getSharedValue(sharedKey) {
          return instance.sharedValues && instance.sharedValues[sharedKey];
        },
        setSharedValue: function setSharedValue(sharedKey, update) {
          if (!instance.sharedValues) {
            instance.sharedValues = {};
          }

          var newValue =
            typeof update === "function"
              ? update(instance.sharedValues[sharedKey])
              : update;

          instance.sharedValues[sharedKey] = newValue;
        },
        forceUpdate: function forceUpdate() {
          return instance.forceUpdate();
        },
        listen: function listen(event, handler) {
          listeners[event] = [].concat(listeners[event] || [], [handler]);

          return function() {
            listeners[event] = listeners[event].filter(function(h) {
              return h !== handler;
            });
          };
        }
      };

      return {
        public: publicApi,

        memoizeVals: function memoizeVals(vals) {
          if (shouldMemoizeVals) {
            lastVals = vals;
          }
        }
      };
    },

    emitEvent: function emitEvent(event) {
      var handlers = listeners[event];

      if (!handlers || handlers.length === 0) {
        return;
      }

      handlers.forEach(function(handler) {
        handler();
      });
    }
  };
}

function createClassComponent(spec) {
  return (function(_React$Component) {
    inherits(BorexComponent, _React$Component);

    function BorexComponent(props) {
      classCallCheck(this, BorexComponent);

      var _this = possibleConstructorReturn(
        this,
        _React$Component.call(this, props)
      );

      _this.state = {};
      _this.apiMaster = createApiMaster(_this);
      _this.renderFn = spec.initialize(_this.apiMaster);
      return _this;
    }

    BorexComponent.prototype.componentDidMount = function componentDidMount() {
      this.apiMaster.emitEvent("mount");
    };

    BorexComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this.apiMaster.emitEvent("unmount");
    };

    BorexComponent.prototype.componentDidUpdate = function componentDidUpdate() {
      this.apiMaster.emitEvent("update");
    };

    BorexComponent.prototype.render = function render() {
      console.log("render");
      return this.renderFn(this.props);
    };

    return BorexComponent;
  })(React.Component);
}

// const nullSpec = {
//   hocs: [],
//   requiresClass: false,
//   initialize: () => () => null,
// };

function createInititalSpec(renderFn) {
  return {
    hocs: [],
    requiresClass: false,
    initialize: function initialize() {
      return renderFn;
    }
  };
}

function compose() {
  for (
    var _len = arguments.length, funcs = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function(arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function(a, b) {
    return function() {
      return a(b.apply(undefined, arguments));
    };
  });
}

function parseArgs(args) {
  var res = {
    displayName: undefined,
    atomObj: undefined,
    renderFn: function renderFn() {
      return null;
    }
  };

  if (typeof args[0] === "string") {
    res.displayName = args.shift();
  }

  if (_typeof(args[0]) === "object") {
    res.atomObj = args.shift();
  }

  if (typeof args[0] === "function") {
    res.renderFn = args.shift();
  }

  if (args.length > 0) {
    throw new Error("Wrong arguments for createComponent");
  }

  return res;
}

function withDisplayName(Component, displayName) {
  if (displayName) {
    Component.displayName = displayName;
  }

  return Component;
}

function createComponent() {
  for (
    var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    args[_key2] = arguments[_key2];
  }

  var _parseArgs = parseArgs(args),
    displayName = _parseArgs.displayName,
    atomObj = _parseArgs.atomObj,
    renderFn = _parseArgs.renderFn;

  if (!atomObj) {
    return withDisplayName(renderFn, displayName);
  }

  var spec = Object.keys(atomObj)
    .reverse()
    .reduce(function(prevSpec, key) {
      var atom = atomObj[key];

      if (atom.hoc) {
        return _extends({}, prevSpec, {
          hocs: [].concat(prevSpec.hocs, [atom.hoc])
        });
      }

      return _extends({}, prevSpec, {
        requiresClass: prevSpec.requiresClass || atom.requiresClass,
        initialize: function initialize(apiMaster) {
          var atomFn = atom.initialize(apiMaster, key);
          var next = prevSpec.initialize(apiMaster);

          return function(vals) {
            return atomFn(vals, next, key);
          };
        }
      });
    }, createInititalSpec(renderFn));

  var component = spec.requiresClass
    ? createClassComponent(spec)
    : spec.initialize();
  var namedComponent = withDisplayName(component, displayName);

  if (spec.hocs.length > 0) {
    var enhance = compose.apply(undefined, spec.hocs);

    return enhance(namedComponent);
  }

  return namedComponent;
}

function featuredAtom(initFn) {
  return {
    requiresClass: true,
    initialize: function initialize(apiMaster, key) {
      var api = apiMaster.scopeTo(key);
      var atomFn = initFn(api.public, key);

      return function(vals, next, key) {
        var result = atomFn(vals, next, key);
        api.memoizeVals(vals);

        return result;
      };
    }
  };
}

function plainAtom(renderFn) {
  return {
    requiresClass: false,
    initialize: function initialize() {
      return renderFn;
    }
  };
}

function lifecycleAtom(initFn) {
  return {
    requiresClass: true,
    initialize: function initialize(apiMaster, key) {
      var api = apiMaster.scopeTo(key);
      initFn(api.public, key);

      return function(vals, next) {
        api.memoizeVals(vals);

        return next(vals);
      };
    }
  };
}

var contextValue = function(Context, mapper) {
  return plainAtom(function(vals, next, key) {
    return React.createElement(Context.Consumer, null, function(value) {
      var _babelHelpers$extends;

      return next(
        _extends(
          {},
          vals,
          ((_babelHelpers$extends = {}),
          (_babelHelpers$extends[key] = mapper ? mapper(value) : value),
          _babelHelpers$extends)
        )
      );
    });
  });
};

var defaultValue = function(value) {
  return plainAtom(function(vals, next, key) {
    var _babelHelpers$extends;

    return next(
      typeof vals[key] === "undefined"
        ? _extends(
            {},
            vals,
            ((_babelHelpers$extends = {}),
            (_babelHelpers$extends[key] = value),
            _babelHelpers$extends)
          )
        : vals
    );
  });
};

var mapObject = function mapObject(obj, mapFn) {
  return Object.keys(obj).reduce(function(memo, key) {
    var _babelHelpers$extends;

    return _extends(
      {},
      memo,
      ((_babelHelpers$extends = {}),
      (_babelHelpers$extends[key] = mapFn(obj[key])),
      _babelHelpers$extends)
    );
  }, {});
};

var objMapper = function objMapper(mapFn) {
  return function(obj) {
    return mapObject(obj, mapFn);
  };
};

var inUniqueScope = function inUniqueScope(atom) {
  var _ref;

  return (_ref = {}), (_ref[Math.random()] = atom), _ref;
};

var valuesExtender = function valuesExtender(getter) {
  return function(vals, next, key) {
    var _babelHelpers$extends2;

    return next(
      _extends(
        {},
        vals,
        ((_babelHelpers$extends2 = {}),
        (_babelHelpers$extends2[key] = getter(vals, key)),
        _babelHelpers$extends2)
      )
    );
  };
};

var helpers = /*#__PURE__*/ Object.freeze({
  mapObject: mapObject,
  objMapper: objMapper,
  inUniqueScope: inUniqueScope,
  valuesExtender: valuesExtender
});

function extractFrom(valKey, srcKey) {
  return plainAtom(
    valuesExtender(function(vals, key) {
      return vals[valKey] && vals[valKey][srcKey || key];
    })
  );
}

var handler = function(handlerFn) {
  return featuredAtom(function(api) {
    api.enableValsMemoization();
    var handler = function handler() {
      return handlerFn(api.vals).apply(undefined, arguments);
    };

    return valuesExtender(function() {
      return handler;
    });
  });
};

var handlers = objMapper(handler);

var hoc = function(hoc) {
  return inUniqueScope({ hoc: hoc });
};

var lifecycle = function(handlersObj) {
  return inUniqueScope(
    lifecycleAtom(function(api) {
      api.enableValsMemoization();
      var events = Object.keys(handlersObj);

      events.forEach(function(event) {
        var handler = handlersObj[event];
        api.listen(event, function() {
          return handler(api.vals);
        });
      });
    })
  );
};

var onMount = function(handler) {
  return lifecycle({ mount: handler });
};

var onUnmount = function(handler) {
  return lifecycle({ unmount: handler });
};

var onUpdate = function(handler) {
  return lifecycle({ update: handler });
};

function refsMap() {
  return featuredAtom(function() {
    var setters = {};
    var refs = {};

    var refMapApi = {
      get: function get(refId) {
        return refs[refId];
      },
      set: function set(refId) {
        if (!setters[refId]) {
          setters[refId] = function(element) {
            if (element) {
              refs[refId] = element;
              return;
            }

            delete refs[refId];
            delete setters[refId];
          };
        }

        return setters[refId];
      }
    };

    return valuesExtender(function() {
      return refMapApi;
    });
  });
}

function refValue() {
  return featuredAtom(function() {
    var ref = React.createRef();

    return valuesExtender(function() {
      return ref;
    });
  });
}

var render = function(renderFn) {
  return inUniqueScope(plainAtom(renderFn));
};

var renderIf = function(predicate, renderOrRendered) {
  return render(function(vals, next) {
    if (!predicate(vals)) {
      return next(vals);
    }

    if (typeof renderOrRendered === "function") {
      return renderOrRendered(vals, next);
    }

    return renderOrRendered;
  });
};

function createMemoizedSelector(mapper) {
  var lastValue = null;
  var lastResult = null;

  return function(value) {
    if (lastValue !== value) {
      lastValue = value;
      lastResult = mapper ? mapper(value) : value;
    }

    return lastResult;
  };
}

var stateValue = function(initializer, handlerFns) {
  return featuredAtom(function(api) {
    var initialized = false;
    api.enableValsMemoization();

    var handlers = mapObject(handlerFns, function(fn) {
      return function(mayBeEvent) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        if (mayBeEvent && typeof mayBeEvent.persist === "function") {
          mayBeEvent.persist();
        }

        api.setStateValue(function(state) {
          return fn(state, api.vals).apply(
            undefined,
            [mayBeEvent].concat(args)
          );
        });
      };
    });

    var getValue = createMemoizedSelector(function(state) {
      return _extends({}, state, handlers);
    });

    return valuesExtender(function(vals) {
      if (!initialized) {
        initialized = true;
        var initialState =
          typeof initializer === "function" ? initializer(vals) : initializer;
        api.initStateValue(initialState);

        return getValue(initialState);
      }

      return getValue(api.getStateValue());
    });
  });
};

var value = function(getter) {
  return plainAtom(valuesExtender(getter));
};

var values = objMapper(value);

export {
  createComponent,
  helpers,
  plainAtom,
  featuredAtom,
  lifecycleAtom,
  contextValue,
  defaultValue,
  extractFrom,
  handler,
  handlers,
  hoc,
  lifecycle,
  onMount,
  onUnmount,
  onUpdate,
  refsMap,
  refValue,
  render,
  renderIf,
  stateValue,
  value,
  values
};
