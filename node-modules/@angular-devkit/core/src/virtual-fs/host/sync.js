"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = require("../../exception");
class SynchronousDelegateExpectedException extends exception_1.BaseException {
    constructor() { super(`Expected a synchronous delegate but got an asynchronous one.`); }
}
exports.SynchronousDelegateExpectedException = SynchronousDelegateExpectedException;
/**
 * Implement a synchronous-only host interface (remove the Observable parts).
 */
class SyncDelegateHost {
    constructor(_delegate) {
        this._delegate = _delegate;
        if (!_delegate.capabilities.synchronous) {
            throw new SynchronousDelegateExpectedException();
        }
    }
    _doSyncCall(observable) {
        let completed = false;
        let result = undefined;
        let errorResult = undefined;
        observable.subscribe({
            next(x) { result = x; },
            error(err) { errorResult = err; },
            complete() { completed = true; },
        });
        if (errorResult !== undefined) {
            throw errorResult;
        }
        if (!completed) {
            throw new SynchronousDelegateExpectedException();
        }
        // The non-null operation is to work around `void` type. We don't allow to return undefined
        // but ResultT could be void, which is undefined in JavaScript, so this doesn't change the
        // behaviour.
        // tslint:disable-next-line:non-null-operator
        return result;
    }
    get capabilities() {
        return this._delegate.capabilities;
    }
    get delegate() {
        return this._delegate;
    }
    write(path, content) {
        return this._doSyncCall(this._delegate.write(path, content));
    }
    read(path) {
        return this._doSyncCall(this._delegate.read(path));
    }
    delete(path) {
        return this._doSyncCall(this._delegate.delete(path));
    }
    rename(from, to) {
        return this._doSyncCall(this._delegate.rename(from, to));
    }
    list(path) {
        return this._doSyncCall(this._delegate.list(path));
    }
    exists(path) {
        return this._doSyncCall(this._delegate.exists(path));
    }
    isDirectory(path) {
        return this._doSyncCall(this._delegate.isDirectory(path));
    }
    isFile(path) {
        return this._doSyncCall(this._delegate.isFile(path));
    }
    // Some hosts may not support stat.
    stat(path) {
        const result = this._delegate.stat(path);
        if (result) {
            return this._doSyncCall(result);
        }
        else {
            return null;
        }
    }
    watch(path, options) {
        return this._delegate.watch(path, options);
    }
}
exports.SyncDelegateHost = SyncDelegateHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdmlydHVhbC1mcy9ob3N0L3N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSwrQ0FBZ0Q7QUFhaEQsMENBQWtELFNBQVEseUJBQWE7SUFDckUsZ0JBQWdCLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6RjtBQUZELG9GQUVDO0FBRUQ7O0dBRUc7QUFDSDtJQUNFLFlBQXNCLFNBQWtCO1FBQWxCLGNBQVMsR0FBVCxTQUFTLENBQVM7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLG9DQUFvQyxFQUFFLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7SUFFUyxXQUFXLENBQVUsVUFBK0I7UUFDNUQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksTUFBTSxHQUF3QixTQUFTLENBQUM7UUFDNUMsSUFBSSxXQUFXLEdBQXNCLFNBQVMsQ0FBQztRQUMvQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFVLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLEdBQVUsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QyxRQUFRLEtBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxXQUFXLENBQUM7UUFDcEIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sSUFBSSxvQ0FBb0MsRUFBRSxDQUFDO1FBQ25ELENBQUM7UUFFRCwyRkFBMkY7UUFDM0YsMEZBQTBGO1FBQzFGLGFBQWE7UUFDYiw2Q0FBNkM7UUFDN0MsTUFBTSxDQUFDLE1BQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxJQUFJLFFBQVE7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQVUsRUFBRSxPQUF1QjtRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQVU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDRCxNQUFNLENBQUMsSUFBVTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFVLEVBQUUsRUFBUTtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxNQUFNLENBQUMsSUFBVTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELFdBQVcsQ0FBQyxJQUFVO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFVO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsbUNBQW1DO0lBQ25DLElBQUksQ0FBQyxJQUFVO1FBQ2IsTUFBTSxNQUFNLEdBQXVDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBVSxFQUFFLE9BQTBCO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBL0VELDRDQStFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi8uLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgUGF0aCwgUGF0aEZyYWdtZW50IH0gZnJvbSAnLi4vcGF0aCc7XG5pbXBvcnQge1xuICBGaWxlQnVmZmVyLFxuICBGaWxlQnVmZmVyTGlrZSxcbiAgSG9zdCxcbiAgSG9zdENhcGFiaWxpdGllcyxcbiAgSG9zdFdhdGNoRXZlbnQsXG4gIEhvc3RXYXRjaE9wdGlvbnMsXG4gIFN0YXRzLFxufSBmcm9tICcuL2ludGVyZmFjZSc7XG5cblxuZXhwb3J0IGNsYXNzIFN5bmNocm9ub3VzRGVsZWdhdGVFeHBlY3RlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoYEV4cGVjdGVkIGEgc3luY2hyb25vdXMgZGVsZWdhdGUgYnV0IGdvdCBhbiBhc3luY2hyb25vdXMgb25lLmApOyB9XG59XG5cbi8qKlxuICogSW1wbGVtZW50IGEgc3luY2hyb25vdXMtb25seSBob3N0IGludGVyZmFjZSAocmVtb3ZlIHRoZSBPYnNlcnZhYmxlIHBhcnRzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFN5bmNEZWxlZ2F0ZUhvc3Q8VCBleHRlbmRzIG9iamVjdCA9IHt9PiB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfZGVsZWdhdGU6IEhvc3Q8VD4pIHtcbiAgICBpZiAoIV9kZWxlZ2F0ZS5jYXBhYmlsaXRpZXMuc3luY2hyb25vdXMpIHtcbiAgICAgIHRocm93IG5ldyBTeW5jaHJvbm91c0RlbGVnYXRlRXhwZWN0ZWRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2RvU3luY0NhbGw8UmVzdWx0VD4ob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxSZXN1bHRUPik6IFJlc3VsdFQge1xuICAgIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBsZXQgcmVzdWx0OiBSZXN1bHRUIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGxldCBlcnJvclJlc3VsdDogRXJyb3IgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dCh4OiBSZXN1bHRUKSB7IHJlc3VsdCA9IHg7IH0sXG4gICAgICBlcnJvcihlcnI6IEVycm9yKSB7IGVycm9yUmVzdWx0ID0gZXJyOyB9LFxuICAgICAgY29tcGxldGUoKSB7IGNvbXBsZXRlZCA9IHRydWU7IH0sXG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3JSZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgZXJyb3JSZXN1bHQ7XG4gICAgfVxuICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICB0aHJvdyBuZXcgU3luY2hyb25vdXNEZWxlZ2F0ZUV4cGVjdGVkRXhjZXB0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gVGhlIG5vbi1udWxsIG9wZXJhdGlvbiBpcyB0byB3b3JrIGFyb3VuZCBgdm9pZGAgdHlwZS4gV2UgZG9uJ3QgYWxsb3cgdG8gcmV0dXJuIHVuZGVmaW5lZFxuICAgIC8vIGJ1dCBSZXN1bHRUIGNvdWxkIGJlIHZvaWQsIHdoaWNoIGlzIHVuZGVmaW5lZCBpbiBKYXZhU2NyaXB0LCBzbyB0aGlzIGRvZXNuJ3QgY2hhbmdlIHRoZVxuICAgIC8vIGJlaGF2aW91ci5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm9uLW51bGwtb3BlcmF0b3JcbiAgICByZXR1cm4gcmVzdWx0ICE7XG4gIH1cblxuICBnZXQgY2FwYWJpbGl0aWVzKCk6IEhvc3RDYXBhYmlsaXRpZXMge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5jYXBhYmlsaXRpZXM7XG4gIH1cbiAgZ2V0IGRlbGVnYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZTtcbiAgfVxuXG4gIHdyaXRlKHBhdGg6IFBhdGgsIGNvbnRlbnQ6IEZpbGVCdWZmZXJMaWtlKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2RvU3luY0NhbGwodGhpcy5fZGVsZWdhdGUud3JpdGUocGF0aCwgY29udGVudCkpO1xuICB9XG4gIHJlYWQocGF0aDogUGF0aCk6IEZpbGVCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9kb1N5bmNDYWxsKHRoaXMuX2RlbGVnYXRlLnJlYWQocGF0aCkpO1xuICB9XG4gIGRlbGV0ZShwYXRoOiBQYXRoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX2RvU3luY0NhbGwodGhpcy5fZGVsZWdhdGUuZGVsZXRlKHBhdGgpKTtcbiAgfVxuICByZW5hbWUoZnJvbTogUGF0aCwgdG86IFBhdGgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fZG9TeW5jQ2FsbCh0aGlzLl9kZWxlZ2F0ZS5yZW5hbWUoZnJvbSwgdG8pKTtcbiAgfVxuXG4gIGxpc3QocGF0aDogUGF0aCk6IFBhdGhGcmFnbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZG9TeW5jQ2FsbCh0aGlzLl9kZWxlZ2F0ZS5saXN0KHBhdGgpKTtcbiAgfVxuXG4gIGV4aXN0cyhwYXRoOiBQYXRoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvU3luY0NhbGwodGhpcy5fZGVsZWdhdGUuZXhpc3RzKHBhdGgpKTtcbiAgfVxuICBpc0RpcmVjdG9yeShwYXRoOiBQYXRoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvU3luY0NhbGwodGhpcy5fZGVsZWdhdGUuaXNEaXJlY3RvcnkocGF0aCkpO1xuICB9XG4gIGlzRmlsZShwYXRoOiBQYXRoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RvU3luY0NhbGwodGhpcy5fZGVsZWdhdGUuaXNGaWxlKHBhdGgpKTtcbiAgfVxuXG4gIC8vIFNvbWUgaG9zdHMgbWF5IG5vdCBzdXBwb3J0IHN0YXQuXG4gIHN0YXQocGF0aDogUGF0aCk6IFN0YXRzPFQ+IHwgbnVsbCB7XG4gICAgY29uc3QgcmVzdWx0OiBPYnNlcnZhYmxlPFN0YXRzPFQ+IHwgbnVsbD4gfCBudWxsID0gdGhpcy5fZGVsZWdhdGUuc3RhdChwYXRoKTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kb1N5bmNDYWxsKHJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHdhdGNoKHBhdGg6IFBhdGgsIG9wdGlvbnM/OiBIb3N0V2F0Y2hPcHRpb25zKTogT2JzZXJ2YWJsZTxIb3N0V2F0Y2hFdmVudD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUud2F0Y2gocGF0aCwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==