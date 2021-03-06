/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/render3/r3_jit", ["require", "exports", "tslib", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/output/output_jit"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var o = require("@angular/compiler/src/output/output_ast");
    var output_jit_1 = require("@angular/compiler/src/output/output_jit");
    /**
     * Implementation of `CompileReflector` which resolves references to @angular/core
     * symbols at runtime, according to a consumer-provided mapping.
     *
     * Only supports `resolveExternalReference`, all other methods throw.
     */
    var R3JitReflector = /** @class */ (function () {
        function R3JitReflector(context) {
            this.context = context;
        }
        R3JitReflector.prototype.resolveExternalReference = function (ref) {
            // This reflector only handles @angular/core imports.
            if (ref.moduleName !== '@angular/core') {
                throw new Error("Cannot resolve external reference to " + ref.moduleName + ", only references to @angular/core are supported.");
            }
            if (!this.context.hasOwnProperty(ref.name)) {
                throw new Error("No value provided for @angular/core symbol '" + ref.name + "'.");
            }
            return this.context[ref.name];
        };
        R3JitReflector.prototype.parameters = function (typeOrFunc) { throw new Error('Not implemented.'); };
        R3JitReflector.prototype.annotations = function (typeOrFunc) { throw new Error('Not implemented.'); };
        R3JitReflector.prototype.shallowAnnotations = function (typeOrFunc) { throw new Error('Not implemented.'); };
        R3JitReflector.prototype.tryAnnotations = function (typeOrFunc) { throw new Error('Not implemented.'); };
        R3JitReflector.prototype.propMetadata = function (typeOrFunc) { throw new Error('Not implemented.'); };
        R3JitReflector.prototype.hasLifecycleHook = function (type, lcProperty) { throw new Error('Not implemented.'); };
        R3JitReflector.prototype.guards = function (typeOrFunc) { throw new Error('Not implemented.'); };
        R3JitReflector.prototype.componentModuleUrl = function (type, cmpMetadata) { throw new Error('Not implemented.'); };
        return R3JitReflector;
    }());
    /**
     * JIT compiles an expression and returns the result of executing that expression.
     *
     * @param def the definition which will be compiled and executed to get the value to patch
     * @param context an object map of @angular/core symbol names to symbols which will be available in
     * the context of the compiled expression
     * @param sourceUrl a URL to use for the source map of the compiled expression
     * @param constantPool an optional `ConstantPool` which contains constants used in the expression
     */
    function jitExpression(def, context, sourceUrl, constantPool) {
        // The ConstantPool may contain Statements which declare variables used in the final expression.
        // Therefore, its statements need to precede the actual JIT operation. The final statement is a
        // declaration of $def which is set to the expression being compiled.
        var statements = tslib_1.__spread((constantPool !== undefined ? constantPool.statements : []), [
            new o.DeclareVarStmt('$def', def, undefined, [o.StmtModifier.Exported]),
        ]);
        var res = output_jit_1.jitStatements(sourceUrl, statements, new R3JitReflector(context), false);
        return res['$def'];
    }
    exports.jitExpression = jitExpression;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfaml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfaml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUlILDJEQUEwQztJQUMxQyxzRUFBbUQ7SUFFbkQ7Ozs7O09BS0c7SUFDSDtRQUNFLHdCQUFvQixPQUE2QjtZQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUFHLENBQUM7UUFFckQsaURBQXdCLEdBQXhCLFVBQXlCLEdBQXdCO1lBQy9DLHFEQUFxRDtZQUNyRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssZUFBZSxFQUFFO2dCQUN0QyxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUF3QyxHQUFHLENBQUMsVUFBVSxzREFBbUQsQ0FBQyxDQUFDO2FBQ2hIO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFNLENBQUMsRUFBRTtnQkFDNUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBK0MsR0FBRyxDQUFDLElBQUssT0FBSSxDQUFDLENBQUM7YUFDL0U7WUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxtQ0FBVSxHQUFWLFVBQVcsVUFBZSxJQUFhLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0Usb0NBQVcsR0FBWCxVQUFZLFVBQWUsSUFBVyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVFLDJDQUFrQixHQUFsQixVQUFtQixVQUFlLElBQVcsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRix1Q0FBYyxHQUFkLFVBQWUsVUFBZSxJQUFXLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0UscUNBQVksR0FBWixVQUFhLFVBQWUsSUFBNkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRix5Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBUyxFQUFFLFVBQWtCLElBQWEsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRywrQkFBTSxHQUFOLFVBQU8sVUFBZSxJQUEyQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZGLDJDQUFrQixHQUFsQixVQUFtQixJQUFTLEVBQUUsV0FBZ0IsSUFBWSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLHFCQUFDO0lBQUQsQ0FBQyxBQTlCRCxJQThCQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsdUJBQ0ksR0FBaUIsRUFBRSxPQUE2QixFQUFFLFNBQWlCLEVBQ25FLFlBQTJCO1FBQzdCLGdHQUFnRztRQUNoRywrRkFBK0Y7UUFDL0YscUVBQXFFO1FBQ3JFLElBQU0sVUFBVSxvQkFDWCxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM5RCxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1VBQ3hFLENBQUM7UUFFRixJQUFNLEdBQUcsR0FBRywwQkFBYSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckYsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQWJELHNDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7Q29uc3RhbnRQb29sfSBmcm9tICcuLi9jb25zdGFudF9wb29sJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtqaXRTdGF0ZW1lbnRzfSBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2ppdCc7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgYENvbXBpbGVSZWZsZWN0b3JgIHdoaWNoIHJlc29sdmVzIHJlZmVyZW5jZXMgdG8gQGFuZ3VsYXIvY29yZVxuICogc3ltYm9scyBhdCBydW50aW1lLCBhY2NvcmRpbmcgdG8gYSBjb25zdW1lci1wcm92aWRlZCBtYXBwaW5nLlxuICpcbiAqIE9ubHkgc3VwcG9ydHMgYHJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZWAsIGFsbCBvdGhlciBtZXRob2RzIHRocm93LlxuICovXG5jbGFzcyBSM0ppdFJlZmxlY3RvciBpbXBsZW1lbnRzIENvbXBpbGVSZWZsZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRleHQ6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7fVxuXG4gIHJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShyZWY6IG8uRXh0ZXJuYWxSZWZlcmVuY2UpOiBhbnkge1xuICAgIC8vIFRoaXMgcmVmbGVjdG9yIG9ubHkgaGFuZGxlcyBAYW5ndWxhci9jb3JlIGltcG9ydHMuXG4gICAgaWYgKHJlZi5tb2R1bGVOYW1lICE9PSAnQGFuZ3VsYXIvY29yZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQ2Fubm90IHJlc29sdmUgZXh0ZXJuYWwgcmVmZXJlbmNlIHRvICR7cmVmLm1vZHVsZU5hbWV9LCBvbmx5IHJlZmVyZW5jZXMgdG8gQGFuZ3VsYXIvY29yZSBhcmUgc3VwcG9ydGVkLmApO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29udGV4dC5oYXNPd25Qcm9wZXJ0eShyZWYubmFtZSAhKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyB2YWx1ZSBwcm92aWRlZCBmb3IgQGFuZ3VsYXIvY29yZSBzeW1ib2wgJyR7cmVmLm5hbWUhfScuYCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbnRleHRbcmVmLm5hbWUgIV07XG4gIH1cblxuICBwYXJhbWV0ZXJzKHR5cGVPckZ1bmM6IGFueSk6IGFueVtdW10geyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTsgfVxuXG4gIGFubm90YXRpb25zKHR5cGVPckZ1bmM6IGFueSk6IGFueVtdIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7IH1cblxuICBzaGFsbG93QW5ub3RhdGlvbnModHlwZU9yRnVuYzogYW55KTogYW55W10geyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTsgfVxuXG4gIHRyeUFubm90YXRpb25zKHR5cGVPckZ1bmM6IGFueSk6IGFueVtdIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7IH1cblxuICBwcm9wTWV0YWRhdGEodHlwZU9yRnVuYzogYW55KToge1trZXk6IHN0cmluZ106IGFueVtdO30geyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4nKTsgfVxuXG4gIGhhc0xpZmVjeWNsZUhvb2sodHlwZTogYW55LCBsY1Byb3BlcnR5OiBzdHJpbmcpOiBib29sZWFuIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7IH1cblxuICBndWFyZHModHlwZU9yRnVuYzogYW55KToge1trZXk6IHN0cmluZ106IGFueTt9IHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7IH1cblxuICBjb21wb25lbnRNb2R1bGVVcmwodHlwZTogYW55LCBjbXBNZXRhZGF0YTogYW55KTogc3RyaW5nIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQuJyk7IH1cbn1cblxuLyoqXG4gKiBKSVQgY29tcGlsZXMgYW4gZXhwcmVzc2lvbiBhbmQgcmV0dXJucyB0aGUgcmVzdWx0IG9mIGV4ZWN1dGluZyB0aGF0IGV4cHJlc3Npb24uXG4gKlxuICogQHBhcmFtIGRlZiB0aGUgZGVmaW5pdGlvbiB3aGljaCB3aWxsIGJlIGNvbXBpbGVkIGFuZCBleGVjdXRlZCB0byBnZXQgdGhlIHZhbHVlIHRvIHBhdGNoXG4gKiBAcGFyYW0gY29udGV4dCBhbiBvYmplY3QgbWFwIG9mIEBhbmd1bGFyL2NvcmUgc3ltYm9sIG5hbWVzIHRvIHN5bWJvbHMgd2hpY2ggd2lsbCBiZSBhdmFpbGFibGUgaW5cbiAqIHRoZSBjb250ZXh0IG9mIHRoZSBjb21waWxlZCBleHByZXNzaW9uXG4gKiBAcGFyYW0gc291cmNlVXJsIGEgVVJMIHRvIHVzZSBmb3IgdGhlIHNvdXJjZSBtYXAgb2YgdGhlIGNvbXBpbGVkIGV4cHJlc3Npb25cbiAqIEBwYXJhbSBjb25zdGFudFBvb2wgYW4gb3B0aW9uYWwgYENvbnN0YW50UG9vbGAgd2hpY2ggY29udGFpbnMgY29uc3RhbnRzIHVzZWQgaW4gdGhlIGV4cHJlc3Npb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGppdEV4cHJlc3Npb24oXG4gICAgZGVmOiBvLkV4cHJlc3Npb24sIGNvbnRleHQ6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBzb3VyY2VVcmw6IHN0cmluZyxcbiAgICBjb25zdGFudFBvb2w/OiBDb25zdGFudFBvb2wpOiBhbnkge1xuICAvLyBUaGUgQ29uc3RhbnRQb29sIG1heSBjb250YWluIFN0YXRlbWVudHMgd2hpY2ggZGVjbGFyZSB2YXJpYWJsZXMgdXNlZCBpbiB0aGUgZmluYWwgZXhwcmVzc2lvbi5cbiAgLy8gVGhlcmVmb3JlLCBpdHMgc3RhdGVtZW50cyBuZWVkIHRvIHByZWNlZGUgdGhlIGFjdHVhbCBKSVQgb3BlcmF0aW9uLiBUaGUgZmluYWwgc3RhdGVtZW50IGlzIGFcbiAgLy8gZGVjbGFyYXRpb24gb2YgJGRlZiB3aGljaCBpcyBzZXQgdG8gdGhlIGV4cHJlc3Npb24gYmVpbmcgY29tcGlsZWQuXG4gIGNvbnN0IHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10gPSBbXG4gICAgLi4uKGNvbnN0YW50UG9vbCAhPT0gdW5kZWZpbmVkID8gY29uc3RhbnRQb29sLnN0YXRlbWVudHMgOiBbXSksXG4gICAgbmV3IG8uRGVjbGFyZVZhclN0bXQoJyRkZWYnLCBkZWYsIHVuZGVmaW5lZCwgW28uU3RtdE1vZGlmaWVyLkV4cG9ydGVkXSksXG4gIF07XG5cbiAgY29uc3QgcmVzID0gaml0U3RhdGVtZW50cyhzb3VyY2VVcmwsIHN0YXRlbWVudHMsIG5ldyBSM0ppdFJlZmxlY3Rvcihjb250ZXh0KSwgZmFsc2UpO1xuICByZXR1cm4gcmVzWyckZGVmJ107XG59XG4iXX0=