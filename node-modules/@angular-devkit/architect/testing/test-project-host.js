"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class TestProjectHost extends node_1.NodeJsSyncHost {
    constructor(_templateRoot) {
        super();
        this._templateRoot = _templateRoot;
        this._currentRoot = null;
        this._scopedSyncHost = null;
    }
    root() {
        if (this._currentRoot === null) {
            throw new Error('TestProjectHost must be initialized before being used.');
        }
        return this._currentRoot;
    }
    scopedSync() {
        if (this._currentRoot === null || this._scopedSyncHost === null) {
            throw new Error('TestProjectHost must be initialized before being used.');
        }
        return this._scopedSyncHost;
    }
    initialize() {
        const recursiveList = (path) => this.list(path).pipe(
        // Emit each fragment individually.
        operators_1.concatMap(fragments => rxjs_1.from(fragments)), 
        // Join the path with fragment.
        operators_1.map(fragment => core_1.join(path, fragment)), 
        // Emit directory content paths instead of the directory path.
        operators_1.mergeMap(path => this.isDirectory(path).pipe(operators_1.concatMap(isDir => isDir ? recursiveList(path) : rxjs_1.of(path)))));
        // Find a unique folder that we can write to to use as current root.
        return this.findUniqueFolderPath().pipe(
        // Save the path and create a scoped host for it.
        operators_1.tap(newFolderPath => {
            this._currentRoot = newFolderPath;
            this._scopedSyncHost = new core_1.virtualFs.SyncDelegateHost(new core_1.virtualFs.ScopedHost(this, this.root()));
        }), 
        // List all files in root.
        operators_1.concatMap(() => recursiveList(this._templateRoot)), 
        // Copy them over to the current root.
        operators_1.concatMap(from => {
            const to = core_1.join(this.root(), core_1.relative(this._templateRoot, from));
            return this.read(from).pipe(operators_1.concatMap(buffer => this.write(to, buffer)));
        }), operators_1.map(() => { }));
    }
    restore() {
        if (this._currentRoot === null) {
            return rxjs_1.EMPTY;
        }
        // Delete the current root and clear the variables.
        // Wait 50ms and retry up to 10 times, to give time for file locks to clear.
        return this.exists(this.root()).pipe(operators_1.delay(50), operators_1.concatMap(exists => exists ? this.delete(this.root()) : rxjs_1.EMPTY), operators_1.retry(10), operators_1.finalize(() => {
            this._currentRoot = null;
            this._scopedSyncHost = null;
        }));
    }
    writeMultipleFiles(files) {
        Object.keys(files).forEach(fileName => {
            let content = files[fileName];
            if (typeof content == 'string') {
                content = core_1.virtualFs.stringToFileBuffer(content);
            }
            else if (content instanceof Buffer) {
                content = content.buffer.slice(content.byteOffset, content.byteOffset + content.byteLength);
            }
            this.scopedSync().write(core_1.normalize(fileName), content);
        });
    }
    replaceInFile(path, match, replacement) {
        const content = core_1.virtualFs.fileBufferToString(this.scopedSync().read(core_1.normalize(path)));
        this.scopedSync().write(core_1.normalize(path), core_1.virtualFs.stringToFileBuffer(content.replace(match, replacement)));
    }
    appendToFile(path, str) {
        const content = core_1.virtualFs.fileBufferToString(this.scopedSync().read(core_1.normalize(path)));
        this.scopedSync().write(core_1.normalize(path), core_1.virtualFs.stringToFileBuffer(content.concat(str)));
    }
    fileMatchExists(dir, regex) {
        const [fileName] = this.scopedSync().list(core_1.normalize(dir)).filter(name => name.match(regex));
        return fileName || undefined;
    }
    copyFile(from, to) {
        const content = this.scopedSync().read(core_1.normalize(from));
        this.scopedSync().write(core_1.normalize(to), content);
    }
    findUniqueFolderPath() {
        // 11 character alphanumeric string.
        const randomString = Math.random().toString(36).slice(2);
        const newFolderName = `test-project-host-${core_1.basename(this._templateRoot)}-${randomString}`;
        const newFolderPath = core_1.join(core_1.dirname(this._templateRoot), newFolderName);
        return this.exists(newFolderPath).pipe(operators_1.concatMap(exists => exists ? this.findUniqueFolderPath() : rxjs_1.of(newFolderPath)));
    }
}
exports.TestProjectHost = TestProjectHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1wcm9qZWN0LWhvc3QuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2FyY2hpdGVjdC90ZXN0aW5nL3Rlc3QtcHJvamVjdC1ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsK0NBUThCO0FBQzlCLG9EQUEyRDtBQUUzRCwrQkFBbUQ7QUFDbkQsOENBQXVGO0FBR3ZGLHFCQUE2QixTQUFRLHFCQUFjO0lBSWpELFlBQXNCLGFBQW1CO1FBQ3ZDLEtBQUssRUFBRSxDQUFDO1FBRFksa0JBQWEsR0FBYixhQUFhLENBQU07UUFIakMsaUJBQVksR0FBZ0IsSUFBSSxDQUFDO1FBQ2pDLG9CQUFlLEdBQTZDLElBQUksQ0FBQztJQUl6RSxDQUFDO0lBRUQsSUFBSTtRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLGFBQWEsR0FBRyxDQUFDLElBQVUsRUFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtRQUMxRSxtQ0FBbUM7UUFDbkMscUJBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFD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LENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQzlFLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFoSUQsMENBZ0lDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBQYXRoLFxuICBiYXNlbmFtZSxcbiAgZGlybmFtZSxcbiAgam9pbixcbiAgbm9ybWFsaXplLFxuICByZWxhdGl2ZSxcbiAgdmlydHVhbEZzLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBOb2RlSnNTeW5jSG9zdCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL25vZGUnO1xuaW1wb3J0IHsgU3RhdHMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSwgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgZGVsYXksIGZpbmFsaXplLCBtYXAsIG1lcmdlTWFwLCByZXRyeSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmV4cG9ydCBjbGFzcyBUZXN0UHJvamVjdEhvc3QgZXh0ZW5kcyBOb2RlSnNTeW5jSG9zdCB7XG4gIHByaXZhdGUgX2N1cnJlbnRSb290OiBQYXRoIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3Njb3BlZFN5bmNIb3N0OiB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdDxTdGF0cz4gfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX3RlbXBsYXRlUm9vdDogUGF0aCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICByb290KCk6IFBhdGgge1xuICAgIGlmICh0aGlzLl9jdXJyZW50Um9vdCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXN0UHJvamVjdEhvc3QgbXVzdCBiZSBpbml0aWFsaXplZCBiZWZvcmUgYmVpbmcgdXNlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFJvb3Q7XG4gIH1cblxuICBzY29wZWRTeW5jKCk6IHZpcnR1YWxGcy5TeW5jRGVsZWdhdGVIb3N0PFN0YXRzPiB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRSb290ID09PSBudWxsIHx8IHRoaXMuX3Njb3BlZFN5bmNIb3N0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rlc3RQcm9qZWN0SG9zdCBtdXN0IGJlIGluaXRpYWxpemVkIGJlZm9yZSBiZWluZyB1c2VkLicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zY29wZWRTeW5jSG9zdDtcbiAgfVxuXG4gIGluaXRpYWxpemUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgY29uc3QgcmVjdXJzaXZlTGlzdCA9IChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxQYXRoPiA9PiB0aGlzLmxpc3QocGF0aCkucGlwZShcbiAgICAgIC8vIEVtaXQgZWFjaCBmcmFnbWVudCBpbmRpdmlkdWFsbHkuXG4gICAgICBjb25jYXRNYXAoZnJhZ21lbnRzID0+IGZyb20oZnJhZ21lbnRzKSksXG4gICAgICAvLyBKb2luIHRoZSBwYXRoIHdpdGggZnJhZ21lbnQuXG4gICAgICBtYXAoZnJhZ21lbnQgPT4gam9pbihwYXRoLCBmcmFnbWVudCkpLFxuICAgICAgLy8gRW1pdCBkaXJlY3RvcnkgY29udGVudCBwYXRocyBpbnN0ZWFkIG9mIHRoZSBkaXJlY3RvcnkgcGF0aC5cbiAgICAgIG1lcmdlTWFwKHBhdGggPT4gdGhpcy5pc0RpcmVjdG9yeShwYXRoKS5waXBlKFxuICAgICAgICBjb25jYXRNYXAoaXNEaXIgPT4gaXNEaXIgPyByZWN1cnNpdmVMaXN0KHBhdGgpIDogb2YocGF0aCkpLFxuICAgICAgKSksXG4gICAgKTtcblxuICAgIC8vIEZpbmQgYSB1bmlxdWUgZm9sZGVyIHRoYXQgd2UgY2FuIHdyaXRlIHRvIHRvIHVzZSBhcyBjdXJyZW50IHJvb3QuXG4gICAgcmV0dXJuIHRoaXMuZmluZFVuaXF1ZUZvbGRlclBhdGgoKS5waXBlKFxuICAgICAgLy8gU2F2ZSB0aGUgcGF0aCBhbmQgY3JlYXRlIGEgc2NvcGVkIGhvc3QgZm9yIGl0LlxuICAgICAgdGFwKG5ld0ZvbGRlclBhdGggPT4ge1xuICAgICAgICB0aGlzLl9jdXJyZW50Um9vdCA9IG5ld0ZvbGRlclBhdGg7XG4gICAgICAgIHRoaXMuX3Njb3BlZFN5bmNIb3N0ID0gbmV3IHZpcnR1YWxGcy5TeW5jRGVsZWdhdGVIb3N0KFxuICAgICAgICAgIG5ldyB2aXJ0dWFsRnMuU2NvcGVkSG9zdCh0aGlzLCB0aGlzLnJvb3QoKSkpO1xuICAgICAgfSksXG4gICAgICAvLyBMaXN0IGFsbCBmaWxlcyBpbiByb290LlxuICAgICAgY29uY2F0TWFwKCgpID0+IHJlY3Vyc2l2ZUxpc3QodGhpcy5fdGVtcGxhdGVSb290KSksXG4gICAgICAvLyBDb3B5IHRoZW0gb3ZlciB0byB0aGUgY3VycmVudCByb290LlxuICAgICAgY29uY2F0TWFwKGZyb20gPT4ge1xuICAgICAgICBjb25zdCB0byA9IGpvaW4odGhpcy5yb290KCksIHJlbGF0aXZlKHRoaXMuX3RlbXBsYXRlUm9vdCwgZnJvbSkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWQoZnJvbSkucGlwZShcbiAgICAgICAgICBjb25jYXRNYXAoYnVmZmVyID0+IHRoaXMud3JpdGUodG8sIGJ1ZmZlcikpLFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBtYXAoKCkgPT4geyB9KSxcbiAgICApO1xuICB9XG5cbiAgcmVzdG9yZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5fY3VycmVudFJvb3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBFTVBUWTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgdGhlIGN1cnJlbnQgcm9vdCBhbmQgY2xlYXIgdGhlIHZhcmlhYmxlcy5cbiAgICAvLyBXYWl0IDUwbXMgYW5kIHJldHJ5IHVwIHRvIDEwIHRpbWVzLCB0byBnaXZlIHRpbWUgZm9yIGZpbGUgbG9ja3MgdG8gY2xlYXIuXG4gICAgcmV0dXJuIHRoaXMuZXhpc3RzKHRoaXMucm9vdCgpKS5waXBlKFxuICAgICAgZGVsYXkoNTApLFxuICAgICAgY29uY2F0TWFwKGV4aXN0cyA9PiBleGlzdHMgPyB0aGlzLmRlbGV0ZSh0aGlzLnJvb3QoKSkgOiBFTVBUWSksXG4gICAgICByZXRyeSgxMCksXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRSb290ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2NvcGVkU3luY0hvc3QgPSBudWxsO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIHdyaXRlTXVsdGlwbGVGaWxlcyhmaWxlczogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgQXJyYXlCdWZmZXJMaWtlIHwgQnVmZmVyIH0pOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyhmaWxlcykuZm9yRWFjaChmaWxlTmFtZSA9PiB7XG4gICAgICBsZXQgY29udGVudCA9IGZpbGVzW2ZpbGVOYW1lXTtcbiAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PSAnc3RyaW5nJykge1xuICAgICAgICBjb250ZW50ID0gdmlydHVhbEZzLnN0cmluZ1RvRmlsZUJ1ZmZlcihjb250ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5idWZmZXIuc2xpY2UoXG4gICAgICAgICAgY29udGVudC5ieXRlT2Zmc2V0LFxuICAgICAgICAgIGNvbnRlbnQuYnl0ZU9mZnNldCArIGNvbnRlbnQuYnl0ZUxlbmd0aCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zY29wZWRTeW5jKCkud3JpdGUoXG4gICAgICAgIG5vcm1hbGl6ZShmaWxlTmFtZSksXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcmVwbGFjZUluRmlsZShwYXRoOiBzdHJpbmcsIG1hdGNoOiBSZWdFeHAgfCBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb250ZW50ID0gdmlydHVhbEZzLmZpbGVCdWZmZXJUb1N0cmluZyh0aGlzLnNjb3BlZFN5bmMoKS5yZWFkKG5vcm1hbGl6ZShwYXRoKSkpO1xuICAgIHRoaXMuc2NvcGVkU3luYygpLndyaXRlKG5vcm1hbGl6ZShwYXRoKSxcbiAgICAgIHZpcnR1YWxGcy5zdHJpbmdUb0ZpbGVCdWZmZXIoY29udGVudC5yZXBsYWNlKG1hdGNoLCByZXBsYWNlbWVudCkpKTtcbiAgfVxuXG4gIGFwcGVuZFRvRmlsZShwYXRoOiBzdHJpbmcsIHN0cjogc3RyaW5nKSB7XG4gICAgY29uc3QgY29udGVudCA9IHZpcnR1YWxGcy5maWxlQnVmZmVyVG9TdHJpbmcodGhpcy5zY29wZWRTeW5jKCkucmVhZChub3JtYWxpemUocGF0aCkpKTtcbiAgICB0aGlzLnNjb3BlZFN5bmMoKS53cml0ZShub3JtYWxpemUocGF0aCksXG4gICAgICB2aXJ0dWFsRnMuc3RyaW5nVG9GaWxlQnVmZmVyKGNvbnRlbnQuY29uY2F0KHN0cikpKTtcbiAgfVxuXG4gIGZpbGVNYXRjaEV4aXN0cyhkaXI6IHN0cmluZywgcmVnZXg6IFJlZ0V4cCkge1xuICAgIGNvbnN0IFtmaWxlTmFtZV0gPSB0aGlzLnNjb3BlZFN5bmMoKS5saXN0KG5vcm1hbGl6ZShkaXIpKS5maWx0ZXIobmFtZSA9PiBuYW1lLm1hdGNoKHJlZ2V4KSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWUgfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgY29weUZpbGUoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSB7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuc2NvcGVkU3luYygpLnJlYWQobm9ybWFsaXplKGZyb20pKTtcbiAgICB0aGlzLnNjb3BlZFN5bmMoKS53cml0ZShub3JtYWxpemUodG8pLCBjb250ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFVuaXF1ZUZvbGRlclBhdGgoKTogT2JzZXJ2YWJsZTxQYXRoPiB7XG4gICAgLy8gMTEgY2hhcmFjdGVyIGFscGhhbnVtZXJpYyBzdHJpbmcuXG4gICAgY29uc3QgcmFuZG9tU3RyaW5nID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMik7XG4gICAgY29uc3QgbmV3Rm9sZGVyTmFtZSA9IGB0ZXN0LXByb2plY3QtaG9zdC0ke2Jhc2VuYW1lKHRoaXMuX3RlbXBsYXRlUm9vdCl9LSR7cmFuZG9tU3RyaW5nfWA7XG4gICAgY29uc3QgbmV3Rm9sZGVyUGF0aCA9IGpvaW4oZGlybmFtZSh0aGlzLl90ZW1wbGF0ZVJvb3QpLCBuZXdGb2xkZXJOYW1lKTtcblxuICAgIHJldHVybiB0aGlzLmV4aXN0cyhuZXdGb2xkZXJQYXRoKS5waXBlKFxuICAgICAgY29uY2F0TWFwKGV4aXN0cyA9PiBleGlzdHMgPyB0aGlzLmZpbmRVbmlxdWVGb2xkZXJQYXRoKCkgOiBvZihuZXdGb2xkZXJQYXRoKSksXG4gICAgKTtcbiAgfVxufVxuIl19