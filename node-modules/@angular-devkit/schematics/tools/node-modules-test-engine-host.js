"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_module_engine_host_1 = require("./node-module-engine-host");
/**
 * An EngineHost that uses a registry to super seed locations of collection.json files, but
 * revert back to using node modules resolution. This is done for testing.
 */
class NodeModulesTestEngineHost extends node_module_engine_host_1.NodeModulesEngineHost {
    constructor() {
        super(...arguments);
        this._collections = new Map();
        this._tasks = [];
    }
    get tasks() { return this._tasks; }
    clearTasks() { this._tasks = []; }
    registerCollection(name, path) {
        this._collections.set(name, path);
    }
    transformContext(context) {
        const oldAddTask = context.addTask;
        context.addTask = (task, dependencies) => {
            this._tasks.push(task.toConfiguration());
            return oldAddTask.call(context, task, dependencies);
        };
        return context;
    }
    _resolveCollectionPath(name) {
        const maybePath = this._collections.get(name);
        if (maybePath) {
            return maybePath;
        }
        return super._resolveCollectionPath(name);
    }
}
exports.NodeModulesTestEngineHost = NodeModulesTestEngineHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1tb2R1bGVzLXRlc3QtZW5naW5lLWhvc3QuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdG9vbHMvbm9kZS1tb2R1bGVzLXRlc3QtZW5naW5lLWhvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFTQSx1RUFBa0U7QUFHbEU7OztHQUdHO0FBQ0gsK0JBQXVDLFNBQVEsK0NBQXFCO0lBQXBFOztRQUNVLGlCQUFZLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDekMsV0FBTSxHQUFHLEVBQXlCLENBQUM7SUE2QjdDLENBQUM7SUEzQkMsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRW5DLFVBQVUsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEMsa0JBQWtCLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFtQztRQUNsRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFvQyxFQUFFLFlBQTRCLEVBQUUsRUFBRTtZQUN2RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUV6QyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVTLHNCQUFzQixDQUFDLElBQVk7UUFDM0MsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGO0FBL0JELDhEQStCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFRhc2tDb25maWd1cmF0aW9uLCBUYXNrQ29uZmlndXJhdGlvbkdlbmVyYXRvciwgVGFza0lkIH0gZnJvbSAnLi4vc3JjL2VuZ2luZSc7XG5pbXBvcnQgeyBGaWxlU3lzdGVtU2NoZW1hdGljQ29udGV4dCB9IGZyb20gJy4vZGVzY3JpcHRpb24nO1xuaW1wb3J0IHsgTm9kZU1vZHVsZXNFbmdpbmVIb3N0IH0gZnJvbSAnLi9ub2RlLW1vZHVsZS1lbmdpbmUtaG9zdCc7XG5cblxuLyoqXG4gKiBBbiBFbmdpbmVIb3N0IHRoYXQgdXNlcyBhIHJlZ2lzdHJ5IHRvIHN1cGVyIHNlZWQgbG9jYXRpb25zIG9mIGNvbGxlY3Rpb24uanNvbiBmaWxlcywgYnV0XG4gKiByZXZlcnQgYmFjayB0byB1c2luZyBub2RlIG1vZHVsZXMgcmVzb2x1dGlvbi4gVGhpcyBpcyBkb25lIGZvciB0ZXN0aW5nLlxuICovXG5leHBvcnQgY2xhc3MgTm9kZU1vZHVsZXNUZXN0RW5naW5lSG9zdCBleHRlbmRzIE5vZGVNb2R1bGVzRW5naW5lSG9zdCB7XG4gIHByaXZhdGUgX2NvbGxlY3Rpb25zID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBfdGFza3MgPSBbXSBhcyBUYXNrQ29uZmlndXJhdGlvbltdO1xuXG4gIGdldCB0YXNrcygpIHsgcmV0dXJuIHRoaXMuX3Rhc2tzOyB9XG5cbiAgY2xlYXJUYXNrcygpIHsgdGhpcy5fdGFza3MgPSBbXTsgfVxuXG4gIHJlZ2lzdGVyQ29sbGVjdGlvbihuYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuX2NvbGxlY3Rpb25zLnNldChuYW1lLCBwYXRoKTtcbiAgfVxuXG4gIHRyYW5zZm9ybUNvbnRleHQoY29udGV4dDogRmlsZVN5c3RlbVNjaGVtYXRpY0NvbnRleHQpOiBGaWxlU3lzdGVtU2NoZW1hdGljQ29udGV4dCB7XG4gICAgY29uc3Qgb2xkQWRkVGFzayA9IGNvbnRleHQuYWRkVGFzaztcbiAgICBjb250ZXh0LmFkZFRhc2sgPSAodGFzazogVGFza0NvbmZpZ3VyYXRpb25HZW5lcmF0b3I8e30+LCBkZXBlbmRlbmNpZXM/OiBBcnJheTxUYXNrSWQ+KSA9PiB7XG4gICAgICB0aGlzLl90YXNrcy5wdXNoKHRhc2sudG9Db25maWd1cmF0aW9uKCkpO1xuXG4gICAgICByZXR1cm4gb2xkQWRkVGFzay5jYWxsKGNvbnRleHQsIHRhc2ssIGRlcGVuZGVuY2llcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9yZXNvbHZlQ29sbGVjdGlvblBhdGgobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXliZVBhdGggPSB0aGlzLl9jb2xsZWN0aW9ucy5nZXQobmFtZSk7XG4gICAgaWYgKG1heWJlUGF0aCkge1xuICAgICAgcmV0dXJuIG1heWJlUGF0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuX3Jlc29sdmVDb2xsZWN0aW9uUGF0aChuYW1lKTtcbiAgfVxufVxuIl19