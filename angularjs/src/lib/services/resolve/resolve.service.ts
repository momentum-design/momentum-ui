import * as angular from 'angular';

/**
 * Pluggable resolve mechanism for the modal resolve resolution
 * Supports UI Router's $mdResolve service
 */
export class MdResolve implements ng.IServiceProvider {
  private resolver = null;
  public setResolver = (resolver) => {
    this.resolver = resolver;
  };

  public $get = ['$injector', '$q', ($injector, $q) => {
    let resolver = this.resolver ? $injector.get(this.resolver) : null;
    return {
      resolve: (invocables, locals, parent, self) => {
        if (resolver) {
          return resolver.resolve(invocables, locals, parent, self);
        }

        let promises = [];

        angular.forEach(invocables, (value) => {
          if (angular.isFunction(value) || angular.isArray(value)) {
            promises.push($q.resolve($injector.invoke(value)));
          } else if (angular.isString(value)) {
            promises.push($q.resolve($injector.get(value)));
          } else {
            promises.push($q.resolve(value));
          }
        });

        return $q.all(promises).then((resolves) => {
          let resolveObj = {};
          let resolveIter = 0;
          angular.forEach(invocables, (value, key) => {
            resolveObj[key] = resolves[resolveIter++];
          });

          return resolveObj;
        });
      },
    };
  }];
}
