"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpack_1 = require("@ngtools/webpack");
const common_1 = require("./common");
const g = typeof global !== 'undefined' ? global : {};
const webpackLoader = g['_DevKitIsLocal']
    ? require.resolve('@ngtools/webpack')
    : '@ngtools/webpack';
function _createAotPlugin(wco, options, _host, useMain = true, extract = false) {
    const { root, buildOptions } = wco;
    options.compilerOptions = options.compilerOptions || {};
    if (wco.buildOptions.preserveSymlinks) {
        options.compilerOptions.preserveSymlinks = true;
    }
    let i18nInFile = buildOptions.i18nFile
        ? path.resolve(root, buildOptions.i18nFile)
        : undefined;
    const i18nFileAndFormat = extract
        ? {
            i18nOutFile: buildOptions.i18nFile,
            i18nOutFormat: buildOptions.i18nFormat,
        } : {
        i18nInFile: i18nInFile,
        i18nInFormat: buildOptions.i18nFormat,
    };
    const additionalLazyModules = {};
    if (buildOptions.lazyModules) {
        for (const lazyModule of buildOptions.lazyModules) {
            additionalLazyModules[lazyModule] = path.resolve(root, lazyModule);
        }
    }
    const hostReplacementPaths = {};
    if (buildOptions.fileReplacements) {
        for (const replacement of buildOptions.fileReplacements) {
            hostReplacementPaths[replacement.replace] = replacement.with;
        }
    }
    const pluginOptions = Object.assign({ mainPath: useMain ? path.join(root, buildOptions.main) : undefined }, i18nFileAndFormat, { locale: buildOptions.i18nLocale, platform: buildOptions.platform === 'server' ? webpack_1.PLATFORM.Server : webpack_1.PLATFORM.Browser, missingTranslation: buildOptions.i18nMissingTranslation, sourceMap: buildOptions.sourceMap, additionalLazyModules,
        hostReplacementPaths, nameLazyFiles: buildOptions.namedChunks, forkTypeChecker: buildOptions.forkTypeChecker, contextElementDependencyConstructor: require('webpack/lib/dependencies/ContextElementDependency') }, options);
    return new webpack_1.AngularCompilerPlugin(pluginOptions);
}
function getNonAotConfig(wco, host) {
    const { tsConfigPath } = wco;
    return {
        module: { rules: [{ test: /\.tsx?$/, loader: webpackLoader }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath, skipCodeGeneration: true }, host)]
    };
}
exports.getNonAotConfig = getNonAotConfig;
function getAotConfig(wco, host, extract = false) {
    const { tsConfigPath, buildOptions } = wco;
    const loaders = [webpackLoader];
    if (buildOptions.buildOptimizer) {
        loaders.unshift({
            loader: common_1.buildOptimizerLoader,
            options: { sourceMap: buildOptions.sourceMap }
        });
    }
    const test = /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/;
    return {
        module: { rules: [{ test, use: loaders }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath }, host, true, extract)]
    };
}
exports.getAotConfig = getAotConfig;
function getNonAotTestConfig(wco, host) {
    const { tsConfigPath } = wco;
    return {
        module: { rules: [{ test: /\.tsx?$/, loader: webpackLoader }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath, skipCodeGeneration: true }, host, false)]
    };
}
exports.getNonAotTestConfig = getNonAotTestConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvbW9kZWxzL3dlYnBhY2stY29uZmlncy90eXBlc2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBV0EsNkJBQTZCO0FBQzdCLDhDQUkwQjtBQUMxQixxQ0FBZ0Q7QUFJaEQsTUFBTSxDQUFDLEdBQVEsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMzRCxNQUFNLGFBQWEsR0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7SUFDckMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0FBR3ZCLDBCQUNFLEdBQXlCLEVBQ3pCLE9BQVksRUFDWixLQUE0QixFQUM1QixPQUFPLEdBQUcsSUFBSSxFQUNkLE9BQU8sR0FBRyxLQUFLO0lBRWYsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDbkMsT0FBTyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztJQUV4RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsZUFBZSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVE7UUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDM0MsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUVkLE1BQU0saUJBQWlCLEdBQUcsT0FBTztRQUMv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SUFDTCxDQUFDO0lBRUQsTUFBTSxJQUFJLEdBQUcseUNBQXlDLENBQUM7SUFFdkQsTUFBTSxDQUFDO1FBQ0wsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFDM0MsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN4RSxDQUFDO0FBQ0osQ0FBQztBQXJCRCxvQ0FxQkM7QUFFRCw2QkFBb0MsR0FBeUIsRUFBRSxJQUEyQjtJQUN4RixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBRTdCLE1BQU0sQ0FBQztRQUNMLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRTtRQUMvRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzFGLENBQUM7QUFDSixDQUFDO0FBUEQsa0RBT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5pbXBvcnQgeyB2aXJ0dWFsRnMgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBTdGF0cyB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge1xuICBBbmd1bGFyQ29tcGlsZXJQbHVnaW4sXG4gIEFuZ3VsYXJDb21waWxlclBsdWdpbk9wdGlvbnMsXG4gIFBMQVRGT1JNXG59IGZyb20gJ0BuZ3Rvb2xzL3dlYnBhY2snO1xuaW1wb3J0IHsgYnVpbGRPcHRpbWl6ZXJMb2FkZXIgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBXZWJwYWNrQ29uZmlnT3B0aW9ucyB9IGZyb20gJy4uL2J1aWxkLW9wdGlvbnMnO1xuXG5cbmNvbnN0IGc6IGFueSA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge307XG5jb25zdCB3ZWJwYWNrTG9hZGVyOiBzdHJpbmcgPSBnWydfRGV2S2l0SXNMb2NhbCddXG4gID8gcmVxdWlyZS5yZXNvbHZlKCdAbmd0b29scy93ZWJwYWNrJylcbiAgOiAnQG5ndG9vbHMvd2VicGFjayc7XG5cblxuZnVuY3Rpb24gX2NyZWF0ZUFvdFBsdWdpbihcbiAgd2NvOiBXZWJwYWNrQ29uZmlnT3B0aW9ucyxcbiAgb3B0aW9uczogYW55LFxuICBfaG9zdDogdmlydHVhbEZzLkhvc3Q8U3RhdHM+LFxuICB1c2VNYWluID0gdHJ1ZSxcbiAgZXh0cmFjdCA9IGZhbHNlLFxuKSB7XG4gIGNvbnN0IHsgcm9vdCwgYnVpbGRPcHRpb25zIH0gPSB3Y287XG4gIG9wdGlvbnMuY29tcGlsZXJPcHRpb25zID0gb3B0aW9ucy5jb21waWxlck9wdGlvbnMgfHwge307XG5cbiAgaWYgKHdjby5idWlsZE9wdGlvbnMucHJlc2VydmVTeW1saW5rcykge1xuICAgIG9wdGlvbnMuY29tcGlsZXJPcHRpb25zLnByZXNlcnZlU3ltbGlua3MgPSB0cnVlO1xuICB9XG5cbiAgbGV0IGkxOG5JbkZpbGUgPSBidWlsZE9wdGlvbnMuaTE4bkZpbGVcbiAgICA/IHBhdGgucmVzb2x2ZShyb290LCBidWlsZE9wdGlvbnMuaTE4bkZpbGUpXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgaTE4bkZpbGVBbmRGb3JtYXQgPSBleHRyYWN0XG4gICAgPyB7XG4gICAgICBpMThuT3V0RmlsZTogYnVpbGRPcHRpb25zLmkxOG5GaWxlLFxuICAgICAgaTE4bk91dEZvcm1hdDogYnVpbGRPcHRpb25zLmkxOG5Gb3JtYXQsXG4gICAgfSA6IHtcbiAgICAgIGkxOG5JbkZpbGU6IGkxOG5JbkZpbGUsXG4gICAgICBpMThuSW5Gb3JtYXQ6IGJ1aWxkT3B0aW9ucy5pMThuRm9ybWF0LFxuICAgIH07XG5cbiAgY29uc3QgYWRkaXRpb25hbExhenlNb2R1bGVzOiB7IFttb2R1bGU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIGlmIChidWlsZE9wdGlvbnMubGF6eU1vZHVsZXMpIHtcbiAgICBmb3IgKGNvbnN0IGxhenlNb2R1bGUgb2YgYnVpbGRPcHRpb25zLmxhenlNb2R1bGVzKSB7XG4gICAgICBhZGRpdGlvbmFsTGF6eU1vZHVsZXNbbGF6eU1vZHVsZV0gPSBwYXRoLnJlc29sdmUoXG4gICAgICAgIHJvb3QsXG4gICAgICAgIGxhenlNb2R1bGUsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGhvc3RSZXBsYWNlbWVudFBhdGhzOiB7IFtyZXBsYWNlOiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBpZiAoYnVpbGRPcHRpb25zLmZpbGVSZXBsYWNlbWVudHMpIHtcbiAgICBmb3IgKGNvbnN0IHJlcGxhY2VtZW50IG9mIGJ1aWxkT3B0aW9ucy5maWxlUmVwbGFjZW1lbnRzKSB7XG4gICAgICBob3N0UmVwbGFjZW1lbnRQYXRoc1tyZXBsYWNlbWVudC5yZXBsYWNlXSA9IHJlcGxhY2VtZW50LndpdGg7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGx1Z2luT3B0aW9uczogQW5ndWxhckNvbXBpbGVyUGx1Z2luT3B0aW9ucyA9IHtcbiAgICBtYWluUGF0aDogdXNlTWFpbiA/IHBhdGguam9pbihyb290LCBidWlsZE9wdGlvbnMubWFpbikgOiB1bmRlZmluZWQsXG4gICAgLi4uaTE4bkZpbGVBbmRGb3JtYXQsXG4gICAgbG9jYWxlOiBidWlsZE9wdGlvbnMuaTE4bkxvY2FsZSxcbiAgICBwbGF0Zm9ybTogYnVpbGRPcHRpb25zLnBsYXRmb3JtID09PSAnc2VydmVyJyA/IFBMQVRGT1JNLlNlcnZlciA6IFBMQVRGT1JNLkJyb3dzZXIsXG4gICAgbWlzc2luZ1RyYW5zbGF0aW9uOiBidWlsZE9wdGlvbnMuaTE4bk1pc3NpbmdUcmFuc2xhdGlvbixcbiAgICBzb3VyY2VNYXA6IGJ1aWxkT3B0aW9ucy5zb3VyY2VNYXAsXG4gICAgYWRkaXRpb25hbExhenlNb2R1bGVzLFxuICAgIGhvc3RSZXBsYWNlbWVudFBhdGhzLFxuICAgIG5hbWVMYXp5RmlsZXM6IGJ1aWxkT3B0aW9ucy5uYW1lZENodW5rcyxcbiAgICBmb3JrVHlwZUNoZWNrZXI6IGJ1aWxkT3B0aW9ucy5mb3JrVHlwZUNoZWNrZXIsXG4gICAgY29udGV4dEVsZW1lbnREZXBlbmRlbmN5Q29uc3RydWN0b3I6IHJlcXVpcmUoJ3dlYnBhY2svbGliL2RlcGVuZGVuY2llcy9Db250ZXh0RWxlbWVudERlcGVuZGVuY3knKSxcbiAgICAuLi5vcHRpb25zLFxuICB9O1xuICByZXR1cm4gbmV3IEFuZ3VsYXJDb21waWxlclBsdWdpbihwbHVnaW5PcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vbkFvdENvbmZpZyh3Y286IFdlYnBhY2tDb25maWdPcHRpb25zLCBob3N0OiB2aXJ0dWFsRnMuSG9zdDxTdGF0cz4pIHtcbiAgY29uc3QgeyB0c0NvbmZpZ1BhdGggfSA9IHdjbztcblxuICByZXR1cm4ge1xuICAgIG1vZHVsZTogeyBydWxlczogW3sgdGVzdDogL1xcLnRzeD8kLywgbG9hZGVyOiB3ZWJwYWNrTG9hZGVyIH1dIH0sXG4gICAgcGx1Z2luczogW19jcmVhdGVBb3RQbHVnaW4od2NvLCB7IHRzQ29uZmlnUGF0aCwgc2tpcENvZGVHZW5lcmF0aW9uOiB0cnVlIH0sIGhvc3QpXVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW90Q29uZmlnKFxuICB3Y286IFdlYnBhY2tDb25maWdPcHRpb25zLFxuICBob3N0OiB2aXJ0dWFsRnMuSG9zdDxTdGF0cz4sXG4gIGV4dHJhY3QgPSBmYWxzZVxuKSB7XG4gIGNvbnN0IHsgdHNDb25maWdQYXRoLCBidWlsZE9wdGlvbnMgfSA9IHdjbztcblxuICBjb25zdCBsb2FkZXJzOiBhbnlbXSA9IFt3ZWJwYWNrTG9hZGVyXTtcbiAgaWYgKGJ1aWxkT3B0aW9ucy5idWlsZE9wdGltaXplcikge1xuICAgIGxvYWRlcnMudW5zaGlmdCh7XG4gICAgICBsb2FkZXI6IGJ1aWxkT3B0aW1pemVyTG9hZGVyLFxuICAgICAgb3B0aW9uczogeyBzb3VyY2VNYXA6IGJ1aWxkT3B0aW9ucy5zb3VyY2VNYXAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgdGVzdCA9IC8oPzpcXC5uZ2ZhY3RvcnlcXC5qc3xcXC5uZ3N0eWxlXFwuanN8XFwudHMpJC87XG5cbiAgcmV0dXJuIHtcbiAgICBtb2R1bGU6IHsgcnVsZXM6IFt7IHRlc3QsIHVzZTogbG9hZGVycyB9XSB9LFxuICAgIHBsdWdpbnM6IFtfY3JlYXRlQW90UGx1Z2luKHdjbywgeyB0c0NvbmZpZ1BhdGggfSwgaG9zdCwgdHJ1ZSwgZXh0cmFjdCldXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROb25Bb3RUZXN0Q29uZmlnKHdjbzogV2VicGFja0NvbmZpZ09wdGlvbnMsIGhvc3Q6IHZpcnR1YWxGcy5Ib3N0PFN0YXRzPikge1xuICBjb25zdCB7IHRzQ29uZmlnUGF0aCB9ID0gd2NvO1xuXG4gIHJldHVybiB7XG4gICAgbW9kdWxlOiB7IHJ1bGVzOiBbeyB0ZXN0OiAvXFwudHN4PyQvLCBsb2FkZXI6IHdlYnBhY2tMb2FkZXIgfV0gfSxcbiAgICBwbHVnaW5zOiBbX2NyZWF0ZUFvdFBsdWdpbih3Y28sIHsgdHNDb25maWdQYXRoLCBza2lwQ29kZUdlbmVyYXRpb246IHRydWUgfSwgaG9zdCwgZmFsc2UpXVxuICB9O1xufVxuIl19