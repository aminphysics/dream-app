"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const interface_1 = require("./tree/interface");
const static_1 = require("./tree/static");
var exception_1 = require("./exception/exception");
exports.SchematicsException = exception_1.SchematicsException;
__export(require("./tree/action"));
__export(require("./engine"));
__export(require("./exception/exception"));
__export(require("./tree/interface"));
__export(require("./rules/base"));
__export(require("./rules/call"));
__export(require("./rules/move"));
__export(require("./rules/random"));
__export(require("./rules/schematic"));
__export(require("./rules/template"));
__export(require("./rules/url"));
__export(require("./tree/delegate"));
__export(require("./tree/empty"));
__export(require("./tree/host-tree"));
__export(require("./tree/filesystem"));
__export(require("./tree/virtual"));
__export(require("./engine/schematic"));
__export(require("./sink/dryrun"));
__export(require("./sink/filesystem"));
__export(require("./sink/host"));
__export(require("./sink/sink"));
const formats = require("./formats");
exports.formats = formats;
const workflow = require("./workflow");
exports.workflow = workflow;
exports.Tree = {
    empty() { return static_1.empty(); },
    branch(tree) { return static_1.branch(tree); },
    merge(tree, other, strategy = interface_1.MergeStrategy.Default) {
        return static_1.merge(tree, other, strategy);
    },
    partition(tree, predicate) {
        return static_1.partition(tree, predicate);
    },
    optimize(tree) { return static_1.optimize(tree); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsZ0RBQWdFO0FBRWhFLDBDQUEwRTtBQUcxRSxtREFBNEQ7QUFBbkQsMENBQUEsbUJBQW1CLENBQUE7QUFFNUIsbUNBQThCO0FBQzlCLDhCQUF5QjtBQUN6QiwyQ0FBc0M7QUFDdEMsc0NBQWlDO0FBQ2pDLGtDQUE2QjtBQUM3QixrQ0FBNkI7QUFDN0Isa0NBQTZCO0FBQzdCLG9DQUErQjtBQUMvQix1Q0FBa0M7QUFDbEMsc0NBQWlDO0FBQ2pDLGlDQUE0QjtBQUM1QixxQ0FBZ0M7QUFDaEMsa0NBQTZCO0FBQzdCLHNDQUFpQztBQUNqQyx1Q0FBa0M7QUFDbEMsb0NBQStCO0FBRS9CLHdDQUFtQztBQUNuQyxtQ0FBOEI7QUFDOUIsdUNBQWtDO0FBQ2xDLGlDQUE0QjtBQUM1QixpQ0FBNEI7QUFFNUIscUNBQXFDO0FBQzVCLDBCQUFPO0FBRWhCLHVDQUF1QztBQUM5Qiw0QkFBUTtBQVdKLFFBQUEsSUFBSSxHQUFvQjtJQUNuQyxLQUFLLEtBQUssTUFBTSxDQUFDLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQUMsSUFBbUIsSUFBSSxNQUFNLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxLQUFLLENBQUMsSUFBbUIsRUFDbkIsS0FBb0IsRUFDcEIsV0FBMEIseUJBQWEsQ0FBQyxPQUFPO1FBQ25ELE1BQU0sQ0FBQyxjQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQW1CLEVBQUUsU0FBaUM7UUFDOUQsTUFBTSxDQUFDLGtCQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBbUIsSUFBSSxNQUFNLENBQUMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEZpbGVQcmVkaWNhdGUsIE1lcmdlU3RyYXRlZ3kgfSBmcm9tICcuL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7IFRyZWUgYXMgVHJlZUludGVyZmFjZSB9IGZyb20gJy4vdHJlZS9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgYnJhbmNoLCBlbXB0eSwgbWVyZ2UsIG9wdGltaXplLCBwYXJ0aXRpb24gfSBmcm9tICcuL3RyZWUvc3RhdGljJztcblxuXG5leHBvcnQgeyBTY2hlbWF0aWNzRXhjZXB0aW9uIH0gZnJvbSAnLi9leGNlcHRpb24vZXhjZXB0aW9uJztcblxuZXhwb3J0ICogZnJvbSAnLi90cmVlL2FjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2VuZ2luZSc7XG5leHBvcnQgKiBmcm9tICcuL2V4Y2VwdGlvbi9leGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi90cmVlL2ludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL3J1bGVzL2Jhc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9ydWxlcy9jYWxsJztcbmV4cG9ydCAqIGZyb20gJy4vcnVsZXMvbW92ZSc7XG5leHBvcnQgKiBmcm9tICcuL3J1bGVzL3JhbmRvbSc7XG5leHBvcnQgKiBmcm9tICcuL3J1bGVzL3NjaGVtYXRpYyc7XG5leHBvcnQgKiBmcm9tICcuL3J1bGVzL3RlbXBsYXRlJztcbmV4cG9ydCAqIGZyb20gJy4vcnVsZXMvdXJsJztcbmV4cG9ydCAqIGZyb20gJy4vdHJlZS9kZWxlZ2F0ZSc7XG5leHBvcnQgKiBmcm9tICcuL3RyZWUvZW1wdHknO1xuZXhwb3J0ICogZnJvbSAnLi90cmVlL2hvc3QtdHJlZSc7XG5leHBvcnQgKiBmcm9tICcuL3RyZWUvZmlsZXN5c3RlbSc7XG5leHBvcnQgKiBmcm9tICcuL3RyZWUvdmlydHVhbCc7XG5leHBvcnQge1VwZGF0ZVJlY29yZGVyfSBmcm9tICcuL3RyZWUvaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4vZW5naW5lL3NjaGVtYXRpYyc7XG5leHBvcnQgKiBmcm9tICcuL3NpbmsvZHJ5cnVuJztcbmV4cG9ydCAqIGZyb20gJy4vc2luay9maWxlc3lzdGVtJztcbmV4cG9ydCAqIGZyb20gJy4vc2luay9ob3N0JztcbmV4cG9ydCAqIGZyb20gJy4vc2luay9zaW5rJztcblxuaW1wb3J0ICogYXMgZm9ybWF0cyBmcm9tICcuL2Zvcm1hdHMnO1xuZXhwb3J0IHsgZm9ybWF0cyB9O1xuXG5pbXBvcnQgKiBhcyB3b3JrZmxvdyBmcm9tICcuL3dvcmtmbG93JztcbmV4cG9ydCB7IHdvcmtmbG93IH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZUNvbnN0cnVjdG9yIHtcbiAgZW1wdHkoKTogVHJlZUludGVyZmFjZTtcbiAgYnJhbmNoKHRyZWU6IFRyZWVJbnRlcmZhY2UpOiBUcmVlSW50ZXJmYWNlO1xuICBtZXJnZSh0cmVlOiBUcmVlSW50ZXJmYWNlLCBvdGhlcjogVHJlZUludGVyZmFjZSwgc3RyYXRlZ3k/OiBNZXJnZVN0cmF0ZWd5KTogVHJlZUludGVyZmFjZTtcbiAgcGFydGl0aW9uKHRyZWU6IFRyZWVJbnRlcmZhY2UsIHByZWRpY2F0ZTogRmlsZVByZWRpY2F0ZTxib29sZWFuPik6IFtUcmVlSW50ZXJmYWNlLCBUcmVlSW50ZXJmYWNlXTtcbiAgb3B0aW1pemUodHJlZTogVHJlZUludGVyZmFjZSk6IFRyZWVJbnRlcmZhY2U7XG59XG5cbmV4cG9ydCB0eXBlIFRyZWUgPSBUcmVlSW50ZXJmYWNlO1xuZXhwb3J0IGNvbnN0IFRyZWU6IFRyZWVDb25zdHJ1Y3RvciA9IHtcbiAgZW1wdHkoKSB7IHJldHVybiBlbXB0eSgpOyB9LFxuICBicmFuY2godHJlZTogVHJlZUludGVyZmFjZSkgeyByZXR1cm4gYnJhbmNoKHRyZWUpOyB9LFxuICBtZXJnZSh0cmVlOiBUcmVlSW50ZXJmYWNlLFxuICAgICAgICBvdGhlcjogVHJlZUludGVyZmFjZSxcbiAgICAgICAgc3RyYXRlZ3k6IE1lcmdlU3RyYXRlZ3kgPSBNZXJnZVN0cmF0ZWd5LkRlZmF1bHQpIHtcbiAgICByZXR1cm4gbWVyZ2UodHJlZSwgb3RoZXIsIHN0cmF0ZWd5KTtcbiAgfSxcbiAgcGFydGl0aW9uKHRyZWU6IFRyZWVJbnRlcmZhY2UsIHByZWRpY2F0ZTogRmlsZVByZWRpY2F0ZTxib29sZWFuPikge1xuICAgIHJldHVybiBwYXJ0aXRpb24odHJlZSwgcHJlZGljYXRlKTtcbiAgfSxcbiAgb3B0aW1pemUodHJlZTogVHJlZUludGVyZmFjZSkgeyByZXR1cm4gb3B0aW1pemUodHJlZSk7IH0sXG59O1xuIl19