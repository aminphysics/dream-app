"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const host_tree_1 = require("../tree/host-tree");
function generateStringOfLength(l) {
    return new Array(l).fill(0).map(_x => {
        return 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    }).join('');
}
function random(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
}
function default_1(options) {
    return () => {
        const root = ('root' in options) ? options.root : '/';
        const map = new host_tree_1.HostTree();
        const nbFiles = ('multiFiles' in options)
            ? (typeof options.multiFiles == 'number' ? options.multiFiles : random(2, 12))
            : 1;
        for (let i = 0; i < nbFiles; i++) {
            const path = 'a/b/c/d/e/f'.slice(Math.random() * 10);
            const fileName = generateStringOfLength(20);
            const content = generateStringOfLength(100);
            map.create(root + '/' + path + '/' + fileName, content);
        }
        return map;
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy9ydWxlcy9yYW5kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxpREFBNkM7QUFHN0MsZ0NBQWdDLENBQVM7SUFDdkMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDbkMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUdELGdCQUFnQixJQUFZLEVBQUUsRUFBVTtJQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDeEQsQ0FBQztBQVVELG1CQUF3QixPQUFzQjtJQUM1QyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUV0RCxNQUFNLEdBQUcsR0FBRyxJQUFJLG9CQUFRLEVBQUUsQ0FBQztRQUMzQixNQUFNLE9BQU8sR0FBRyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDckQsTUFBTSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxPQUFPLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFNUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQW5CRCw0QkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuLi9lbmdpbmUvaW50ZXJmYWNlJztcbmltcG9ydCB7IEhvc3RUcmVlIH0gZnJvbSAnLi4vdHJlZS9ob3N0LXRyZWUnO1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlU3RyaW5nT2ZMZW5ndGgobDogbnVtYmVyKSB7XG4gIHJldHVybiBuZXcgQXJyYXkobCkuZmlsbCgwKS5tYXAoX3ggPT4ge1xuICAgIHJldHVybiAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI2KV07XG4gIH0pLmpvaW4oJycpO1xufVxuXG5cbmZ1bmN0aW9uIHJhbmRvbShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20pKSArIGZyb207XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBSYW5kb21PcHRpb25zIHtcbiAgcm9vdD86IHN0cmluZztcbiAgbXVsdGk/OiBib29sZWFuIHwgbnVtYmVyO1xuICBtdWx0aUZpbGVzPzogYm9vbGVhbiB8IG51bWJlcjtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBSYW5kb21PcHRpb25zKTogU291cmNlIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCByb290ID0gKCdyb290JyBpbiBvcHRpb25zKSA/IG9wdGlvbnMucm9vdCA6ICcvJztcblxuICAgIGNvbnN0IG1hcCA9IG5ldyBIb3N0VHJlZSgpO1xuICAgIGNvbnN0IG5iRmlsZXMgPSAoJ211bHRpRmlsZXMnIGluIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICA/ICh0eXBlb2Ygb3B0aW9ucy5tdWx0aUZpbGVzID09ICdudW1iZXInID8gb3B0aW9ucy5tdWx0aUZpbGVzIDogcmFuZG9tKDIsIDEyKSlcbiAgICAgICAgICAgICAgICAgIDogMTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJGaWxlczsgaSsrKSB7XG4gICAgICBjb25zdCBwYXRoID0gJ2EvYi9jL2QvZS9mJy5zbGljZShNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBnZW5lcmF0ZVN0cmluZ09mTGVuZ3RoKDIwKTtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBnZW5lcmF0ZVN0cmluZ09mTGVuZ3RoKDEwMCk7XG5cbiAgICAgIG1hcC5jcmVhdGUocm9vdCArICcvJyArIHBhdGggKyAnLycgKyBmaWxlTmFtZSwgY29udGVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfTtcbn1cbiJdfQ==