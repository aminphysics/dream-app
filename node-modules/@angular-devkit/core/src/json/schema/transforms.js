"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addUndefinedDefaults(value, _pointer, schema, _root) {
    if (value === undefined && schema) {
        if (schema.items || schema.type == 'array') {
            return [];
        }
        if (schema.properties || schema.type == 'object') {
            const newValue = {};
            for (const propName of Object.getOwnPropertyNames(schema.properties || {})) {
                newValue[propName] = undefined; // tslint:disable-line:no-any
            }
            return newValue;
        }
    }
    else if (schema
        && typeof value == 'object' && value
        && (schema.properties || schema.type == 'object')) {
        for (const propName of Object.getOwnPropertyNames(schema.properties || {})) {
            value[propName] = (propName in value)
                ? value[propName]
                : undefined; // tslint:disable-line:no-any
        }
    }
    return value;
}
exports.addUndefinedDefaults = addUndefinedDefaults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3Jtcy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvanNvbi9zY2hlbWEvdHJhbnNmb3Jtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBLDhCQUNFLEtBQTRCLEVBQzVCLFFBQXFCLEVBQ3JCLE1BQW1CLEVBQ25CLEtBQThCO0lBRTlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sUUFBUSxHQUFlLEVBQUUsQ0FBQztZQUNoQyxHQUFHLENBQUMsQ0FBQyxNQUFNLFFBQVEsSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFnQixDQUFDLENBQUUsNkJBQTZCO1lBQ3ZFLENBQUM7WUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU07V0FDSCxPQUFPLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSztXQUNqQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxRQUFRLENBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQUMsTUFBTSxRQUFRLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLEtBQW9CLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO2dCQUNuRCxDQUFDLENBQUUsS0FBb0IsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxTQUFnQixDQUFDLENBQUUsNkJBQTZCO1FBQ3RELENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWtCLENBQUM7QUFDNUIsQ0FBQztBQTlCRCxvREE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBKc29uQXJyYXksIEpzb25PYmplY3QsIEpzb25WYWx1ZSB9IGZyb20gJy4uL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBKc29uUG9pbnRlciB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVW5kZWZpbmVkRGVmYXVsdHMoXG4gIHZhbHVlOiBKc29uVmFsdWUgfCB1bmRlZmluZWQsXG4gIF9wb2ludGVyOiBKc29uUG9pbnRlcixcbiAgc2NoZW1hPzogSnNvbk9iamVjdCxcbiAgX3Jvb3Q/OiBKc29uT2JqZWN0IHwgSnNvbkFycmF5LFxuKTogSnNvblZhbHVlIHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgc2NoZW1hKSB7XG4gICAgaWYgKHNjaGVtYS5pdGVtcyB8fCBzY2hlbWEudHlwZSA9PSAnYXJyYXknKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEudHlwZSA9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgbmV3VmFsdWU6IEpzb25PYmplY3QgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pKSB7XG4gICAgICAgIG5ld1ZhbHVlW3Byb3BOYW1lXSA9IHVuZGVmaW5lZCBhcyBhbnk7ICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNjaGVtYVxuICAgICAgICAgICAgICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyAmJiB2YWx1ZVxuICAgICAgICAgICAgICYmIChzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEudHlwZSA9PSAnb2JqZWN0JylcbiAgKSB7XG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSkpIHtcbiAgICAgICh2YWx1ZSBhcyBKc29uT2JqZWN0KVtwcm9wTmFtZV0gPSAocHJvcE5hbWUgaW4gdmFsdWUpXG4gICAgICAgID8gKHZhbHVlIGFzIEpzb25PYmplY3QpW3Byb3BOYW1lXVxuICAgICAgICA6IHVuZGVmaW5lZCBhcyBhbnk7ICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZSBhcyBKc29uVmFsdWU7XG59XG4iXX0=