"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class WebpackFileSystemHostAdapter {
    constructor(_host) {
        this._host = _host;
        this._syncHost = null;
    }
    _doHostCall(o, callback) {
        const token = Symbol();
        let value = token;
        let error = false;
        try {
            o.subscribe({
                error(err) {
                    error = true;
                    callback(err);
                },
                next(v) {
                    value = v;
                },
                complete() {
                    if (value !== token) {
                        callback(null, value);
                    }
                    else {
                        callback(new Error('Unknown error happened.'));
                    }
                },
            });
        }
        catch (err) {
            // In some occasions, the error handler above will be called, then an exception will be
            // thrown (by design in observable constructors in RxJS 5). Don't call the callback
            // twice.
            if (!error) {
                callback(err);
            }
        }
    }
    stat(path, callback) {
        const p = core_1.normalize('/' + path);
        const result = this._host.stat(p);
        if (result === null) {
            const o = this._host.exists(p).pipe(operators_1.switchMap(exists => {
                if (!exists) {
                    throw new core_1.FileDoesNotExistException(p);
                }
                return this._host.isDirectory(p).pipe(operators_1.mergeMap(isDirectory => {
                    return (isDirectory ? rxjs_1.of(0) : this._host.read(p).pipe(operators_1.map(content => content.byteLength))).pipe(operators_1.map(size => [isDirectory, size]));
                }));
            }), operators_1.map(([isDirectory, size]) => {
                return {
                    isFile() { return !isDirectory; },
                    isDirectory() { return isDirectory; },
                    size,
                    atime: new Date(),
                    mtime: new Date(),
                    ctime: new Date(),
                    birthtime: new Date(),
                };
            }));
            this._doHostCall(o, callback);
        }
        else {
            this._doHostCall(result, callback);
        }
    }
    readdir(path, callback) {
        return this._doHostCall(this._host.list(core_1.normalize('/' + path)), callback);
    }
    readFile(path, callback) {
        const o = this._host.read(core_1.normalize('/' + path)).pipe(operators_1.map(content => Buffer.from(content)));
        return this._doHostCall(o, callback);
    }
    readJson(path, callback) {
        const o = this._host.read(core_1.normalize('/' + path)).pipe(operators_1.map(content => JSON.parse(core_1.virtualFs.fileBufferToString(content))));
        return this._doHostCall(o, callback);
    }
    readlink(path, callback) {
        const err = new Error('Not a symlink.');
        err.code = 'EINVAL';
        callback(err);
    }
    statSync(path) {
        if (!this._syncHost) {
            this._syncHost = new core_1.virtualFs.SyncDelegateHost(this._host);
        }
        const result = this._syncHost.stat(core_1.normalize('/' + path));
        if (result) {
            return result;
        }
        else {
            return {};
        }
    }
    readdirSync(path) {
        if (!this._syncHost) {
            this._syncHost = new core_1.virtualFs.SyncDelegateHost(this._host);
        }
        return this._syncHost.list(core_1.normalize('/' + path));
    }
    readFileSync(path) {
        if (!this._syncHost) {
            this._syncHost = new core_1.virtualFs.SyncDelegateHost(this._host);
        }
        return Buffer.from(this._syncHost.read(core_1.normalize('/' + path)));
    }
    readJsonSync(path) {
        if (!this._syncHost) {
            this._syncHost = new core_1.virtualFs.SyncDelegateHost(this._host);
        }
        const data = this._syncHost.read(core_1.normalize('/' + path));
        return JSON.parse(core_1.virtualFs.fileBufferToString(data));
    }
    readlinkSync(path) {
        const err = new Error('Not a symlink.');
        err.code = 'EINVAL';
        throw err;
    }
    purge(_changes) { }
}
exports.WebpackFileSystemHostAdapter = WebpackFileSystemHostAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay1maWxlLXN5c3RlbS1ob3N0LWFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL3V0aWxzL3dlYnBhY2stZmlsZS1zeXN0ZW0taG9zdC1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBQW1HO0FBR25HLCtCQUFzQztBQUN0Qyw4Q0FBMEQ7QUFHMUQ7SUFHRSxZQUFzQixLQUE0QjtRQUE1QixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUZ4QyxjQUFTLEdBQTZDLElBQUksQ0FBQztJQUVoQixDQUFDO0lBRTlDLFdBQVcsQ0FBSSxDQUFnQixFQUFFLFFBQXFCO1FBQzVELE1BQU0sS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQUksS0FBSyxHQUFxQixLQUFLLENBQUM7UUFDcEMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRWxCLElBQUksQ0FBQztZQUNILENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ1YsS0FBSyxDQUFDLEdBQUc7b0JBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDWixDQUFDO2dCQUNELFFBQVE7b0JBQ04sRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3hCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztvQkFDakQsQ0FBQztnQkFDSCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztR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QUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXhELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQVk7UUFDdkIsTUFBTSxHQUFHLEdBQTBCLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDcEIsTUFBTSxHQUFHLENBQUM7SUFDWixDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQTRCLElBQVMsQ0FBQztDQUM3QztBQWpKRCxvRUFpSkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uLCBKc29uT2JqZWN0LCBub3JtYWxpemUsIHZpcnR1YWxGcyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IENhbGxiYWNrLCBJbnB1dEZpbGVTeXN0ZW0gfSBmcm9tICdAbmd0b29scy93ZWJwYWNrL3NyYy93ZWJwYWNrJztcbmltcG9ydCB7IFN0YXRzIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5leHBvcnQgY2xhc3MgV2VicGFja0ZpbGVTeXN0ZW1Ib3N0QWRhcHRlciBpbXBsZW1lbnRzIElucHV0RmlsZVN5c3RlbSB7XG4gIHByb3RlY3RlZCBfc3luY0hvc3Q6IHZpcnR1YWxGcy5TeW5jRGVsZWdhdGVIb3N0PFN0YXRzPiB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfaG9zdDogdmlydHVhbEZzLkhvc3Q8U3RhdHM+KSB7fVxuXG4gIHByaXZhdGUgX2RvSG9zdENhbGw8VD4obzogT2JzZXJ2YWJsZTxUPiwgY2FsbGJhY2s6IENhbGxiYWNrPFQ+KSB7XG4gICAgY29uc3QgdG9rZW4gPSBTeW1ib2woKTtcbiAgICBsZXQgdmFsdWU6IFQgfCB0eXBlb2YgdG9rZW4gPSB0b2tlbjtcbiAgICBsZXQgZXJyb3IgPSBmYWxzZTtcblxuICAgIHRyeSB7XG4gICAgICBvLnN1YnNjcmliZSh7XG4gICAgICAgIGVycm9yKGVycikge1xuICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0KHYpIHtcbiAgICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdG9rZW4pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCdVbmtub3duIGVycm9yIGhhcHBlbmVkLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIEluIHNvbWUgb2NjYXNpb25zLCB0aGUgZXJyb3IgaGFuZGxlciBhYm92ZSB3aWxsIGJlIGNhbGxlZCwgdGhlbiBhbiBleGNlcHRpb24gd2lsbCBiZVxuICAgICAgLy8gdGhyb3duIChieSBkZXNpZ24gaW4gb2JzZXJ2YWJsZSBjb25zdHJ1Y3RvcnMgaW4gUnhKUyA1KS4gRG9uJ3QgY2FsbCB0aGUgY2FsbGJhY2tcbiAgICAgIC8vIHR3aWNlLlxuICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXQocGF0aDogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGJhY2s8U3RhdHM+KTogdm9pZCB7XG4gICAgY29uc3QgcCA9IG5vcm1hbGl6ZSgnLycgKyBwYXRoKTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9ob3N0LnN0YXQocCk7XG5cbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICBjb25zdCBvID0gdGhpcy5faG9zdC5leGlzdHMocCkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGV4aXN0cyA9PiB7XG4gICAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzLl9ob3N0LmlzRGlyZWN0b3J5KHApLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChpc0RpcmVjdG9yeSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoaXNEaXJlY3RvcnkgPyBvZigwKSA6IHRoaXMuX2hvc3QucmVhZChwKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChjb250ZW50ID0+IGNvbnRlbnQuYnl0ZUxlbmd0aCksXG4gICAgICAgICAgICAgICkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHNpemUgPT4gW2lzRGlyZWN0b3J5LCBzaXplXSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKChbaXNEaXJlY3RvcnksIHNpemVdKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzRmlsZSgpIHsgcmV0dXJuICFpc0RpcmVjdG9yeTsgfSxcbiAgICAgICAgICAgIGlzRGlyZWN0b3J5KCkgeyByZXR1cm4gaXNEaXJlY3Rvcnk7IH0sXG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgYXRpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBtdGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGN0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgYmlydGh0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5fZG9Ib3N0Q2FsbChvLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RvSG9zdENhbGwocmVzdWx0LCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgcmVhZGRpcihwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYmFjazxzdHJpbmdbXT4pOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5fZG9Ib3N0Q2FsbCh0aGlzLl9ob3N0Lmxpc3Qobm9ybWFsaXplKCcvJyArIHBhdGgpKSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVhZEZpbGUocGF0aDogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGJhY2s8QnVmZmVyPik6IHZvaWQge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9ob3N0LnJlYWQobm9ybWFsaXplKCcvJyArIHBhdGgpKS5waXBlKFxuICAgICAgbWFwKGNvbnRlbnQgPT4gQnVmZmVyLmZyb20oY29udGVudCkpLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5fZG9Ib3N0Q2FsbChvLCBjYWxsYmFjayk7XG4gIH1cblxuICByZWFkSnNvbihwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYmFjazxKc29uT2JqZWN0Pik6IHZvaWQge1xuICAgIGNvbnN0IG8gPSB0aGlzLl9ob3N0LnJlYWQobm9ybWFsaXplKCcvJyArIHBhdGgpKS5waXBlKFxuICAgICAgbWFwKGNvbnRlbnQgPT4gSlNPTi5wYXJzZSh2aXJ0dWFsRnMuZmlsZUJ1ZmZlclRvU3RyaW5nKGNvbnRlbnQpKSksXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLl9kb0hvc3RDYWxsKG8sIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlYWRsaW5rKHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrPHN0cmluZz4pOiB2b2lkIHtcbiAgICBjb25zdCBlcnI6IE5vZGVKUy5FcnJub0V4Y2VwdGlvbiA9IG5ldyBFcnJvcignTm90IGEgc3ltbGluay4nKTtcbiAgICBlcnIuY29kZSA9ICdFSU5WQUwnO1xuICAgIGNhbGxiYWNrKGVycik7XG4gIH1cblxuICBzdGF0U3luYyhwYXRoOiBzdHJpbmcpOiBTdGF0cyB7XG4gICAgaWYgKCF0aGlzLl9zeW5jSG9zdCkge1xuICAgICAgdGhpcy5fc3luY0hvc3QgPSBuZXcgdmlydHVhbEZzLlN5bmNEZWxlZ2F0ZUhvc3QodGhpcy5faG9zdCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fc3luY0hvc3Quc3RhdChub3JtYWxpemUoJy8nICsgcGF0aCkpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7fSBhcyBTdGF0cztcbiAgICB9XG4gIH1cbiAgcmVhZGRpclN5bmMocGF0aDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGlmICghdGhpcy5fc3luY0hvc3QpIHtcbiAgICAgIHRoaXMuX3N5bmNIb3N0ID0gbmV3IHZpcnR1YWxGcy5TeW5jRGVsZWdhdGVIb3N0KHRoaXMuX2hvc3QpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zeW5jSG9zdC5saXN0KG5vcm1hbGl6ZSgnLycgKyBwYXRoKSk7XG4gIH1cbiAgcmVhZEZpbGVTeW5jKHBhdGg6IHN0cmluZyk6IEJ1ZmZlciB7XG4gICAgaWYgKCF0aGlzLl9zeW5jSG9zdCkge1xuICAgICAgdGhpcy5fc3luY0hvc3QgPSBuZXcgdmlydHVhbEZzLlN5bmNEZWxlZ2F0ZUhvc3QodGhpcy5faG9zdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHRoaXMuX3N5bmNIb3N0LnJlYWQobm9ybWFsaXplKCcvJyArIHBhdGgpKSk7XG4gIH1cbiAgcmVhZEpzb25TeW5jKHBhdGg6IHN0cmluZyk6IHt9IHtcbiAgICBpZiAoIXRoaXMuX3N5bmNIb3N0KSB7XG4gICAgICB0aGlzLl9zeW5jSG9zdCA9IG5ldyB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdCh0aGlzLl9ob3N0KTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gdGhpcy5fc3luY0hvc3QucmVhZChub3JtYWxpemUoJy8nICsgcGF0aCkpO1xuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmlydHVhbEZzLmZpbGVCdWZmZXJUb1N0cmluZyhkYXRhKSk7XG4gIH1cbiAgcmVhZGxpbmtTeW5jKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZXJyOiBOb2RlSlMuRXJybm9FeGNlcHRpb24gPSBuZXcgRXJyb3IoJ05vdCBhIHN5bWxpbmsuJyk7XG4gICAgZXJyLmNvZGUgPSAnRUlOVkFMJztcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICBwdXJnZShfY2hhbmdlcz86IHN0cmluZ1tdIHwgc3RyaW5nKTogdm9pZCB7fVxufVxuIl19