"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const exception_1 = require("../exception");
class DependencyNotFoundException extends exception_1.BaseException {
    constructor() { super('One of the dependencies is not part of the set.'); }
}
exports.DependencyNotFoundException = DependencyNotFoundException;
class CircularDependencyFoundException extends exception_1.BaseException {
    constructor() { super('Circular dependencies found.'); }
}
exports.CircularDependencyFoundException = CircularDependencyFoundException;
class PartiallyOrderedSet {
    constructor() {
        this._items = new Map();
    }
    _checkCircularDependencies(item, deps) {
        if (deps.has(item)) {
            throw new CircularDependencyFoundException();
        }
        deps.forEach(dep => this._checkCircularDependencies(item, this._items.get(dep) || new Set()));
    }
    clear() {
        this._items.clear();
    }
    has(item) {
        return this._items.has(item);
    }
    get size() {
        return this._items.size;
    }
    forEach(callbackfn, thisArg) {
        for (const x of this) {
            callbackfn.call(thisArg, x, x, this);
        }
    }
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    *entries() {
        for (const item of this) {
            yield [item, item];
        }
    }
    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys() {
        return this.values();
    }
    /**
     * Returns an iterable of values in the set.
     */
    values() {
        return this[Symbol.iterator]();
    }
    add(item, deps = new Set()) {
        if (Array.isArray(deps)) {
            deps = new Set(deps);
        }
        // Verify item is not already in the set.
        if (this._items.has(item)) {
            const itemDeps = this._items.get(item) || new Set();
            // If the dependency list is equal, just return, otherwise remove and keep going.
            let equal = true;
            for (const dep of deps) {
                if (!itemDeps.has(dep)) {
                    equal = false;
                    break;
                }
            }
            if (equal) {
                for (const dep of itemDeps) {
                    if (!deps.has(dep)) {
                        equal = false;
                        break;
                    }
                }
            }
            if (equal) {
                return this;
            }
            else {
                this._items.delete(item);
            }
        }
        // Verify all dependencies are part of the Set.
        for (const dep of deps) {
            if (!this._items.has(dep)) {
                throw new DependencyNotFoundException();
            }
        }
        // Verify there's no dependency cycle.
        this._checkCircularDependencies(item, deps);
        this._items.set(item, new Set(deps));
        return this;
    }
    delete(item) {
        if (!this._items.has(item)) {
            return false;
        }
        // Remove it from all dependencies if force == true.
        this._items.forEach(value => value.delete(item));
        return this._items.delete(item);
    }
    *[Symbol.iterator]() {
        const copy = new Map(this._items);
        for (const [key, value] of copy.entries()) {
            copy.set(key, new Set(value));
        }
        while (copy.size > 0) {
            const run = [];
            // Take the first item without dependencies.
            for (const [item, deps] of copy.entries()) {
                if (deps.size == 0) {
                    run.push(item);
                }
            }
            for (const item of run) {
                copy.forEach(s => s.delete(item));
                copy.delete(item);
                yield item;
            }
            if (run.length == 0) {
                // uh oh...
                throw new CircularDependencyFoundException();
            }
        }
    }
    get [Symbol.toStringTag]() {
        return 'Set';
    }
}
exports.PartiallyOrderedSet = PartiallyOrderedSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGlhbGx5LW9yZGVyZWQtc2V0LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy91dGlscy9wYXJ0aWFsbHktb3JkZXJlZC1zZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw0Q0FBNkM7QUFFN0MsaUNBQXlDLFNBQVEseUJBQWE7SUFDNUQsZ0JBQWdCLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM1RTtBQUZELGtFQUVDO0FBQ0Qsc0NBQThDLFNBQVEseUJBQWE7SUFDakUsZ0JBQWdCLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6RDtBQUZELDRFQUVDO0FBRUQ7SUFBQTtRQUNVLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBYSxDQUFDO0lBK0l4QyxDQUFDO0lBN0lXLDBCQUEwQixDQUFDLElBQU8sRUFBRSxJQUFZO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sSUFBSSxnQ0FBZ0MsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELEdBQUcsQ0FBQyxJQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJ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LENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixDQUFDO1lBQ0gsQ0FBQztZQUVELEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sSUFBSSxDQUFDO1lBQ2IsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsV0FBVztnQkFDWCxNQUFNLElBQUksZ0NBQWdDLEVBQUUsQ0FBQztZQUMvQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBaEpELGtEQWdKQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jeU5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcignT25lIG9mIHRoZSBkZXBlbmRlbmNpZXMgaXMgbm90IHBhcnQgb2YgdGhlIHNldC4nKTsgfVxufVxuZXhwb3J0IGNsYXNzIENpcmN1bGFyRGVwZW5kZW5jeUZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcignQ2lyY3VsYXIgZGVwZW5kZW5jaWVzIGZvdW5kLicpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJ0aWFsbHlPcmRlcmVkU2V0PFQ+IGltcGxlbWVudHMgU2V0PFQ+IHtcbiAgcHJpdmF0ZSBfaXRlbXMgPSBuZXcgTWFwPFQsIFNldDxUPj4oKTtcblxuICBwcm90ZWN0ZWQgX2NoZWNrQ2lyY3VsYXJEZXBlbmRlbmNpZXMoaXRlbTogVCwgZGVwczogU2V0PFQ+KSB7XG4gICAgaWYgKGRlcHMuaGFzKGl0ZW0pKSB7XG4gICAgICB0aHJvdyBuZXcgQ2lyY3VsYXJEZXBlbmRlbmN5Rm91bmRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBkZXBzLmZvckVhY2goZGVwID0+IHRoaXMuX2NoZWNrQ2lyY3VsYXJEZXBlbmRlbmNpZXMoaXRlbSwgdGhpcy5faXRlbXMuZ2V0KGRlcCkgfHwgbmV3IFNldCgpKSk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9pdGVtcy5jbGVhcigpO1xuICB9XG4gIGhhcyhpdGVtOiBUKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhcyhpdGVtKTtcbiAgfVxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXMuc2l6ZTtcbiAgfVxuICBmb3JFYWNoKFxuICAgIGNhbGxiYWNrZm46ICh2YWx1ZTogVCwgdmFsdWUyOiBULCBzZXQ6IFBhcnRpYWxseU9yZGVyZWRTZXQ8VD4pID0+IHZvaWQsXG4gICAgdGhpc0FyZz86IGFueSwgIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG4gICk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgeCBvZiB0aGlzKSB7XG4gICAgICBjYWxsYmFja2ZuLmNhbGwodGhpc0FyZywgeCwgeCwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gaXRlcmFibGUgb2YgW3Ysdl0gcGFpcnMgZm9yIGV2ZXJ5IHZhbHVlIGB2YCBpbiB0aGUgc2V0LlxuICAgKi9cbiAgKmVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbVCwgVF0+IHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcykge1xuICAgICAgeWllbGQgW2l0ZW0sIGl0ZW1dO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNwaXRlIGl0cyBuYW1lLCByZXR1cm5zIGFuIGl0ZXJhYmxlIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHNldCxcbiAgICovXG4gIGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxUPiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBpdGVyYWJsZSBvZiB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICovXG4gIHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFQ+IHtcbiAgICByZXR1cm4gdGhpc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuXG4gIGFkZChpdGVtOiBULCBkZXBzOiAoU2V0PFQ+IHwgVFtdKSA9IG5ldyBTZXQoKSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRlcHMpKSB7XG4gICAgICBkZXBzID0gbmV3IFNldChkZXBzKTtcbiAgICB9XG5cbiAgICAvLyBWZXJpZnkgaXRlbSBpcyBub3QgYWxyZWFkeSBpbiB0aGUgc2V0LlxuICAgIGlmICh0aGlzLl9pdGVtcy5oYXMoaXRlbSkpIHtcbiAgICAgIGNvbnN0IGl0ZW1EZXBzID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW0pIHx8IG5ldyBTZXQ8VD4oKTtcblxuICAgICAgLy8gSWYgdGhlIGRlcGVuZGVuY3kgbGlzdCBpcyBlcXVhbCwganVzdCByZXR1cm4sIG90aGVyd2lzZSByZW1vdmUgYW5kIGtlZXAgZ29pbmcuXG4gICAgICBsZXQgZXF1YWwgPSB0cnVlO1xuICAgICAgZm9yIChjb25zdCBkZXAgb2YgZGVwcykge1xuICAgICAgICBpZiAoIWl0ZW1EZXBzLmhhcyhkZXApKSB7XG4gICAgICAgICAgZXF1YWwgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVxdWFsKSB7XG4gICAgICAgIGZvciAoY29uc3QgZGVwIG9mIGl0ZW1EZXBzKSB7XG4gICAgICAgICAgaWYgKCFkZXBzLmhhcyhkZXApKSB7XG4gICAgICAgICAgICBlcXVhbCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlcXVhbCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zLmRlbGV0ZShpdGVtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJpZnkgYWxsIGRlcGVuZGVuY2llcyBhcmUgcGFydCBvZiB0aGUgU2V0LlxuICAgIGZvciAoY29uc3QgZGVwIG9mIGRlcHMpIHtcbiAgICAgIGlmICghdGhpcy5faXRlbXMuaGFzKGRlcCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IERlcGVuZGVuY3lOb3RGb3VuZEV4Y2VwdGlvbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcmlmeSB0aGVyZSdzIG5vIGRlcGVuZGVuY3kgY3ljbGUuXG4gICAgdGhpcy5fY2hlY2tDaXJjdWxhckRlcGVuZGVuY2llcyhpdGVtLCBkZXBzKTtcblxuICAgIHRoaXMuX2l0ZW1zLnNldChpdGVtLCBuZXcgU2V0KGRlcHMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVsZXRlKGl0ZW06IFQpIHtcbiAgICBpZiAoIXRoaXMuX2l0ZW1zLmhhcyhpdGVtKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBpdCBmcm9tIGFsbCBkZXBlbmRlbmNpZXMgaWYgZm9yY2UgPT0gdHJ1ZS5cbiAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKHZhbHVlID0+IHZhbHVlLmRlbGV0ZShpdGVtKSk7XG5cbiAgICByZXR1cm4gdGhpcy5faXRlbXMuZGVsZXRlKGl0ZW0pO1xuICB9XG5cbiAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIGNvbnN0IGNvcHk6IE1hcDxULCBTZXQ8VD4+ID0gbmV3IE1hcCh0aGlzLl9pdGVtcyk7XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBjb3B5LmVudHJpZXMoKSkge1xuICAgICAgY29weS5zZXQoa2V5LCBuZXcgU2V0KHZhbHVlKSk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGNvcHkuc2l6ZSA+IDApIHtcbiAgICAgIGNvbnN0IHJ1biA9IFtdO1xuICAgICAgLy8gVGFrZSB0aGUgZmlyc3QgaXRlbSB3aXRob3V0IGRlcGVuZGVuY2llcy5cbiAgICAgIGZvciAoY29uc3QgW2l0ZW0sIGRlcHNdIG9mIGNvcHkuZW50cmllcygpKSB7XG4gICAgICAgIGlmIChkZXBzLnNpemUgPT0gMCkge1xuICAgICAgICAgIHJ1bi5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBydW4pIHtcbiAgICAgICAgY29weS5mb3JFYWNoKHMgPT4gcy5kZWxldGUoaXRlbSkpO1xuICAgICAgICBjb3B5LmRlbGV0ZShpdGVtKTtcbiAgICAgICAgeWllbGQgaXRlbTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJ1bi5sZW5ndGggPT0gMCkge1xuICAgICAgICAvLyB1aCBvaC4uLlxuICAgICAgICB0aHJvdyBuZXcgQ2lyY3VsYXJEZXBlbmRlbmN5Rm91bmRFeGNlcHRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKTogJ1NldCcge1xuICAgIHJldHVybiAnU2V0JztcbiAgfVxufVxuIl19