"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
// Force Webpack to throw compilation errors. Useful with karma-webpack when in single-run mode.
// Workaround for https://github.com/webpack-contrib/karma-webpack/issues/66
class KarmaWebpackFailureCb {
    constructor(callback) {
        this.callback = callback;
    }
    apply(compiler) {
        compiler.hooks.done.tap('KarmaWebpackFailureCb', (stats) => {
            if (stats.compilation.errors.length > 0) {
                this.callback(undefined, stats.compilation.errors.map((error) => error.message ? error.message : error.toString()));
            }
        });
    }
}
exports.KarmaWebpackFailureCb = KarmaWebpackFailureCb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FybWEtd2VicGFjay1mYWlsdXJlLWNiLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9wbHVnaW5zL2thcm1hLXdlYnBhY2stZmFpbHVyZS1jYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUJBQWlCO0FBQ2pCLCtEQUErRDs7QUFFL0QsZ0dBQWdHO0FBQ2hHLDRFQUE0RTtBQUU1RTtJQUNFLFlBQW9CLFFBQStEO1FBQS9ELGFBQVEsR0FBUixRQUFRLENBQXVEO0lBQUksQ0FBQztJQUV4RixLQUFLLENBQUMsUUFBYTtRQUNqQixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUM5RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQVZELHNEQVVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLy8gdHNsaW50OmRpc2FibGVcbi8vIFRPRE86IGNsZWFudXAgdGhpcyBmaWxlLCBpdCdzIGNvcGllZCBhcyBpcyBmcm9tIEFuZ3VsYXIgQ0xJLlxuXG4vLyBGb3JjZSBXZWJwYWNrIHRvIHRocm93IGNvbXBpbGF0aW9uIGVycm9ycy4gVXNlZnVsIHdpdGgga2FybWEtd2VicGFjayB3aGVuIGluIHNpbmdsZS1ydW4gbW9kZS5cbi8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIva2FybWEtd2VicGFjay9pc3N1ZXMvNjZcblxuZXhwb3J0IGNsYXNzIEthcm1hV2VicGFja0ZhaWx1cmVDYiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsbGJhY2s6IChlcnJvcjogc3RyaW5nIHwgdW5kZWZpbmVkLCBlcnJvcnM6IHN0cmluZ1tdKSA9PiB2b2lkKSB7IH1cblxuICBhcHBseShjb21waWxlcjogYW55KTogdm9pZCB7XG4gICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXAoJ0thcm1hV2VicGFja0ZhaWx1cmVDYicsIChzdGF0czogYW55KSA9PiB7XG4gICAgICBpZiAoc3RhdHMuY29tcGlsYXRpb24uZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayh1bmRlZmluZWQsIHN0YXRzLmNvbXBpbGF0aW9uLmVycm9ycy5tYXAoKGVycm9yOiBhbnkpID0+IGVycm9yLm1lc3NhZ2U/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==