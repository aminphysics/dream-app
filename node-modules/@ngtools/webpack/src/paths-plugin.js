"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const path = require("path");
const ts = require("typescript");
function resolveWithPaths(request, callback, compilerOptions, host, cache) {
    if (!request || !request.request || !compilerOptions.paths) {
        callback(null, request);
        return;
    }
    // Only work on Javascript/TypeScript issuers.
    if (!request.contextInfo.issuer || !request.contextInfo.issuer.match(/\.[jt]s$/)) {
        callback(null, request);
        return;
    }
    const originalRequest = request.request.trim();
    // Relative requests are not mapped
    if (originalRequest.startsWith('.') || originalRequest.startsWith('/')) {
        callback(null, request);
        return;
    }
    // Amd requests are not mapped
    if (originalRequest.startsWith('!!webpack amd')) {
        callback(null, request);
        return;
    }
    // check if any path mapping rules are relevant
    const pathMapOptions = [];
    for (const pattern in compilerOptions.paths) {
        // get potentials and remove duplicates; JS Set maintains insertion order
        const potentials = Array.from(new Set(compilerOptions.paths[pattern]));
        if (potentials.length === 0) {
            // no potential replacements so skip
            continue;
        }
        // can only contain zero or one
        const starIndex = pattern.indexOf('*');
        if (starIndex === -1) {
            if (pattern === originalRequest) {
                pathMapOptions.push({
                    starIndex,
                    partial: '',
                    potentials,
                });
            }
        }
        else if (starIndex === 0 && pattern.length === 1) {
            pathMapOptions.push({
                starIndex,
                partial: originalRequest,
                potentials,
            });
        }
        else if (starIndex === pattern.length - 1) {
            if (originalRequest.startsWith(pattern.slice(0, -1))) {
                pathMapOptions.push({
                    starIndex,
                    partial: originalRequest.slice(pattern.length - 1),
                    potentials,
                });
            }
        }
        else {
            const [prefix, suffix] = pattern.split('*');
            if (originalRequest.startsWith(prefix) && originalRequest.endsWith(suffix)) {
                pathMapOptions.push({
                    starIndex,
                    partial: originalRequest.slice(prefix.length).slice(0, -suffix.length),
                    potentials,
                });
            }
        }
    }
    if (pathMapOptions.length === 0) {
        callback(null, request);
        return;
    }
    // exact matches take priority then largest prefix match
    pathMapOptions.sort((a, b) => {
        if (a.starIndex === -1) {
            return -1;
        }
        else if (b.starIndex === -1) {
            return 1;
        }
        else {
            return b.starIndex - a.starIndex;
        }
    });
    if (pathMapOptions[0].potentials.length === 1) {
        const onlyPotential = pathMapOptions[0].potentials[0];
        let replacement;
        const starIndex = onlyPotential.indexOf('*');
        if (starIndex === -1) {
            replacement = onlyPotential;
        }
        else if (starIndex === onlyPotential.length - 1) {
            replacement = onlyPotential.slice(0, -1) + pathMapOptions[0].partial;
        }
        else {
            const [prefix, suffix] = onlyPotential.split('*');
            replacement = prefix + pathMapOptions[0].partial + suffix;
        }
        request.request = path.resolve(compilerOptions.baseUrl || '', replacement);
        callback(null, request);
        return;
    }
    // TODO: The following is used when there is more than one potential and will not be
    //       needed once this is turned into a full webpack resolver plugin
    const moduleResolver = ts.resolveModuleName(originalRequest, request.contextInfo.issuer, compilerOptions, host, cache);
    const moduleFilePath = moduleResolver.resolvedModule
        && moduleResolver.resolvedModule.resolvedFileName;
    // If there is no result, let webpack try to resolve
    if (!moduleFilePath) {
        callback(null, request);
        return;
    }
    // If TypeScript gives us a `.d.ts`, it is probably a node module
    if (moduleFilePath.endsWith('.d.ts')) {
        // If in a package, let webpack resolve the package
        const packageRootPath = path.join(path.dirname(moduleFilePath), 'package.json');
        if (!host.fileExists(packageRootPath)) {
            // Otherwise, if there is a file with a .js extension use that
            const jsFilePath = moduleFilePath.slice(0, -5) + '.js';
            if (host.fileExists(jsFilePath)) {
                request.request = jsFilePath;
            }
        }
        callback(null, request);
        return;
    }
    request.request = moduleFilePath;
    callback(null, request);
}
exports.resolveWithPaths = resolveWithPaths;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aHMtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL3BhdGhzLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFPakMsMEJBQ0UsT0FBbUMsRUFDbkMsUUFBOEMsRUFDOUMsZUFBbUMsRUFDbkMsSUFBcUIsRUFDckIsS0FBZ0M7SUFFaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0QsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV4QixNQUFNLENBQUM7SUFDVCxDQUFDO0lBRUQsOENBQThDO0lBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEIsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUVELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFL0MsbUNBQW1DO0lBQ25DLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV4QixNQUFNLENBQUM7SUFDVCxDQUFDO0lBRUQsOEJBQThCO0lBQzlCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENB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QUE4RDtZQUM5RCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDL0IsQ0FBQztRQUNILENBQUM7UUFFRCxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXhCLE1BQU0sQ0FBQztJQUNULENBQUM7SUFFRCxPQUFPLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztJQUNqQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUE5SkQsNENBOEpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtcbiAgQ2FsbGJhY2ssXG4gIE5vcm1hbE1vZHVsZUZhY3RvcnlSZXF1ZXN0LFxufSBmcm9tICcuL3dlYnBhY2snO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlV2l0aFBhdGhzKFxuICByZXF1ZXN0OiBOb3JtYWxNb2R1bGVGYWN0b3J5UmVxdWVzdCxcbiAgY2FsbGJhY2s6IENhbGxiYWNrPE5vcm1hbE1vZHVsZUZhY3RvcnlSZXF1ZXN0PixcbiAgY29tcGlsZXJPcHRpb25zOiB0cy5Db21waWxlck9wdGlvbnMsXG4gIGhvc3Q6IHRzLkNvbXBpbGVySG9zdCxcbiAgY2FjaGU/OiB0cy5Nb2R1bGVSZXNvbHV0aW9uQ2FjaGUsXG4pIHtcbiAgaWYgKCFyZXF1ZXN0IHx8ICFyZXF1ZXN0LnJlcXVlc3QgfHwgIWNvbXBpbGVyT3B0aW9ucy5wYXRocykge1xuICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gT25seSB3b3JrIG9uIEphdmFzY3JpcHQvVHlwZVNjcmlwdCBpc3N1ZXJzLlxuICBpZiAoIXJlcXVlc3QuY29udGV4dEluZm8uaXNzdWVyIHx8ICFyZXF1ZXN0LmNvbnRleHRJbmZvLmlzc3Vlci5tYXRjaCgvXFwuW2p0XXMkLykpIHtcbiAgICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG9yaWdpbmFsUmVxdWVzdCA9IHJlcXVlc3QucmVxdWVzdC50cmltKCk7XG5cbiAgLy8gUmVsYXRpdmUgcmVxdWVzdHMgYXJlIG5vdCBtYXBwZWRcbiAgaWYgKG9yaWdpbmFsUmVxdWVzdC5zdGFydHNXaXRoKCcuJykgfHwgb3JpZ2luYWxSZXF1ZXN0LnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQW1kIHJlcXVlc3RzIGFyZSBub3QgbWFwcGVkXG4gIGlmIChvcmlnaW5hbFJlcXVlc3Quc3RhcnRzV2l0aCgnISF3ZWJwYWNrIGFtZCcpKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBjaGVjayBpZiBhbnkgcGF0aCBtYXBwaW5nIHJ1bGVzIGFyZSByZWxldmFudFxuICBjb25zdCBwYXRoTWFwT3B0aW9ucyA9IFtdO1xuICBmb3IgKGNvbnN0IHBhdHRlcm4gaW4gY29tcGlsZXJPcHRpb25zLnBhdGhzKSB7XG4gICAgLy8gZ2V0IHBvdGVudGlhbHMgYW5kIHJlbW92ZSBkdXBsaWNhdGVzOyBKUyBTZXQgbWFpbnRhaW5zIGluc2VydGlvbiBvcmRlclxuICAgIGNvbnN0IHBvdGVudGlhbHMgPSBBcnJheS5mcm9tKG5ldyBTZXQoY29tcGlsZXJPcHRpb25zLnBhdGhzW3BhdHRlcm5dKSk7XG4gICAgaWYgKHBvdGVudGlhbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBubyBwb3RlbnRpYWwgcmVwbGFjZW1lbnRzIHNvIHNraXBcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGNhbiBvbmx5IGNvbnRhaW4gemVybyBvciBvbmVcbiAgICBjb25zdCBzdGFySW5kZXggPSBwYXR0ZXJuLmluZGV4T2YoJyonKTtcbiAgICBpZiAoc3RhckluZGV4ID09PSAtMSkge1xuICAgICAgaWYgKHBhdHRlcm4gPT09IG9yaWdpbmFsUmVxdWVzdCkge1xuICAgICAgICBwYXRoTWFwT3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICBzdGFySW5kZXgsXG4gICAgICAgICAgcGFydGlhbDogJycsXG4gICAgICAgICAgcG90ZW50aWFscyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGFySW5kZXggPT09IDAgJiYgcGF0dGVybi5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdGhNYXBPcHRpb25zLnB1c2goe1xuICAgICAgICBzdGFySW5kZXgsXG4gICAgICAgIHBhcnRpYWw6IG9yaWdpbmFsUmVxdWVzdCxcbiAgICAgICAgcG90ZW50aWFscyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc3RhckluZGV4ID09PSBwYXR0ZXJuLmxlbmd0aCAtIDEpIHtcbiAgICAgIGlmIChvcmlnaW5hbFJlcXVlc3Quc3RhcnRzV2l0aChwYXR0ZXJuLnNsaWNlKDAsIC0xKSkpIHtcbiAgICAgICAgcGF0aE1hcE9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgc3RhckluZGV4LFxuICAgICAgICAgIHBhcnRpYWw6IG9yaWdpbmFsUmVxdWVzdC5zbGljZShwYXR0ZXJuLmxlbmd0aCAtIDEpLFxuICAgICAgICAgIHBvdGVudGlhbHMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBbcHJlZml4LCBzdWZmaXhdID0gcGF0dGVybi5zcGxpdCgnKicpO1xuICAgICAgaWYgKG9yaWdpbmFsUmVxdWVzdC5zdGFydHNXaXRoKHByZWZpeCkgJiYgb3JpZ2luYWxSZXF1ZXN0LmVuZHNXaXRoKHN1ZmZpeCkpIHtcbiAgICAgICAgcGF0aE1hcE9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgc3RhckluZGV4LFxuICAgICAgICAgIHBhcnRpYWw6IG9yaWdpbmFsUmVxdWVzdC5zbGljZShwcmVmaXgubGVuZ3RoKS5zbGljZSgwLCAtc3VmZml4Lmxlbmd0aCksXG4gICAgICAgICAgcG90ZW50aWFscyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhdGhNYXBPcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZXhhY3QgbWF0Y2hlcyB0YWtlIHByaW9yaXR5IHRoZW4gbGFyZ2VzdCBwcmVmaXggbWF0Y2hcbiAgcGF0aE1hcE9wdGlvbnMuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLnN0YXJJbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgaWYgKGIuc3RhckluZGV4ID09PSAtMSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBiLnN0YXJJbmRleCAtIGEuc3RhckluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHBhdGhNYXBPcHRpb25zWzBdLnBvdGVudGlhbHMubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3Qgb25seVBvdGVudGlhbCA9IHBhdGhNYXBPcHRpb25zWzBdLnBvdGVudGlhbHNbMF07XG4gICAgbGV0IHJlcGxhY2VtZW50O1xuICAgIGNvbnN0IHN0YXJJbmRleCA9IG9ubHlQb3RlbnRpYWwuaW5kZXhPZignKicpO1xuICAgIGlmIChzdGFySW5kZXggPT09IC0xKSB7XG4gICAgICByZXBsYWNlbWVudCA9IG9ubHlQb3RlbnRpYWw7XG4gICAgfSBlbHNlIGlmIChzdGFySW5kZXggPT09IG9ubHlQb3RlbnRpYWwubGVuZ3RoIC0gMSkge1xuICAgICAgcmVwbGFjZW1lbnQgPSBvbmx5UG90ZW50aWFsLnNsaWNlKDAsIC0xKSArIHBhdGhNYXBPcHRpb25zWzBdLnBhcnRpYWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IFtwcmVmaXgsIHN1ZmZpeF0gPSBvbmx5UG90ZW50aWFsLnNwbGl0KCcqJyk7XG4gICAgICByZXBsYWNlbWVudCA9IHByZWZpeCArIHBhdGhNYXBPcHRpb25zWzBdLnBhcnRpYWwgKyBzdWZmaXg7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5yZXF1ZXN0ID0gcGF0aC5yZXNvbHZlKGNvbXBpbGVyT3B0aW9ucy5iYXNlVXJsIHx8ICcnLCByZXBsYWNlbWVudCk7XG4gICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUT0RPOiBUaGUgZm9sbG93aW5nIGlzIHVzZWQgd2hlbiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHBvdGVudGlhbCBhbmQgd2lsbCBub3QgYmVcbiAgLy8gICAgICAgbmVlZGVkIG9uY2UgdGhpcyBpcyB0dXJuZWQgaW50byBhIGZ1bGwgd2VicGFjayByZXNvbHZlciBwbHVnaW5cblxuICBjb25zdCBtb2R1bGVSZXNvbHZlciA9IHRzLnJlc29sdmVNb2R1bGVOYW1lKFxuICAgIG9yaWdpbmFsUmVxdWVzdCxcbiAgICByZXF1ZXN0LmNvbnRleHRJbmZvLmlzc3VlcixcbiAgICBjb21waWxlck9wdGlvbnMsXG4gICAgaG9zdCxcbiAgICBjYWNoZSxcbiAgKTtcblxuICBjb25zdCBtb2R1bGVGaWxlUGF0aCA9IG1vZHVsZVJlc29sdmVyLnJlc29sdmVkTW9kdWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgJiYgbW9kdWxlUmVzb2x2ZXIucmVzb2x2ZWRNb2R1bGUucmVzb2x2ZWRGaWxlTmFtZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyByZXN1bHQsIGxldCB3ZWJwYWNrIHRyeSB0byByZXNvbHZlXG4gIGlmICghbW9kdWxlRmlsZVBhdGgpIHtcbiAgICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIFR5cGVTY3JpcHQgZ2l2ZXMgdXMgYSBgLmQudHNgLCBpdCBpcyBwcm9iYWJseSBhIG5vZGUgbW9kdWxlXG4gIGlmIChtb2R1bGVGaWxlUGF0aC5lbmRzV2l0aCgnLmQudHMnKSkge1xuICAgIC8vIElmIGluIGEgcGFja2FnZSwgbGV0IHdlYnBhY2sgcmVzb2x2ZSB0aGUgcGFja2FnZVxuICAgIGNvbnN0IHBhY2thZ2VSb290UGF0aCA9IHBhdGguam9pbihwYXRoLmRpcm5hbWUobW9kdWxlRmlsZVBhdGgpLCAncGFja2FnZS5qc29uJyk7XG4gICAgaWYgKCFob3N0LmZpbGVFeGlzdHMocGFja2FnZVJvb3RQYXRoKSkge1xuICAgICAgLy8gT3RoZXJ3aXNlLCBpZiB0aGVyZSBpcyBhIGZpbGUgd2l0aCBhIC5qcyBleHRlbnNpb24gdXNlIHRoYXRcbiAgICAgIGNvbnN0IGpzRmlsZVBhdGggPSBtb2R1bGVGaWxlUGF0aC5zbGljZSgwLCAtNSkgKyAnLmpzJztcbiAgICAgIGlmIChob3N0LmZpbGVFeGlzdHMoanNGaWxlUGF0aCkpIHtcbiAgICAgICAgcmVxdWVzdC5yZXF1ZXN0ID0ganNGaWxlUGF0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHJlcXVlc3QucmVxdWVzdCA9IG1vZHVsZUZpbGVQYXRoO1xuICBjYWxsYmFjayhudWxsLCByZXF1ZXN0KTtcbn1cbiJdfQ==