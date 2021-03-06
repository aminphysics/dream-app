/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName } from '../compile_metadata';
import * as o from '../output/output_ast';
import { error } from '../util';
import { compileFactoryFunction, dependenciesFromGlobalMetadata } from './r3_factory';
import { Identifiers as R3 } from './r3_identifiers';
export function compilePipeFromMetadata(metadata) {
    var definitionMapValues = [];
    // e.g. `name: 'myPipe'`
    definitionMapValues.push({ key: 'name', value: o.literal(metadata.pipeName), quoted: false });
    // e.g. `type: MyPipe`
    definitionMapValues.push({ key: 'type', value: metadata.type, quoted: false });
    var templateFactory = compileFactoryFunction({
        name: metadata.name,
        fnOrClass: metadata.type,
        deps: metadata.deps,
        useNew: true,
        injectFn: R3.directiveInject,
    });
    definitionMapValues.push({ key: 'factory', value: templateFactory, quoted: false });
    // e.g. `pure: true`
    definitionMapValues.push({ key: 'pure', value: o.literal(metadata.pure), quoted: false });
    var expression = o.importExpr(R3.definePipe).callFn([o.literalMap(definitionMapValues)]);
    var type = new o.ExpressionType(o.importExpr(R3.PipeDef, [
        new o.ExpressionType(metadata.type),
        new o.ExpressionType(new o.LiteralExpr(metadata.pipeName)),
    ]));
    return { expression: expression, type: type };
}
/**
 * Write a pipe definition to the output context.
 */
export function compilePipeFromRender2(outputCtx, pipe, reflector) {
    var definitionMapValues = [];
    var name = identifierName(pipe.type);
    if (!name) {
        return error("Cannot resolve the name of " + pipe.type);
    }
    var metadata = {
        name: name,
        pipeName: pipe.name,
        type: outputCtx.importExpr(pipe.type.reference),
        deps: dependenciesFromGlobalMetadata(pipe.type, outputCtx, reflector),
        pure: pipe.pure,
    };
    var res = compilePipeFromMetadata(metadata);
    var definitionField = outputCtx.constantPool.propertyNameOf(3 /* Pipe */);
    outputCtx.statements.push(new o.ClassStmt(
    /* name */ name, 
    /* parent */ null, 
    /* fields */ [new o.ClassField(
        /* name */ definitionField, 
        /* type */ o.INFERRED_TYPE, 
        /* modifiers */ [o.StmtModifier.Static], 
        /* initializer */ res.expression)], 
    /* getters */ [], 
    /* constructorMethod */ new o.ClassMethod(null, [], []), 
    /* methods */ []));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfcGlwZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3BpcGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFzQixjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUd4RSxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBZ0IsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdDLE9BQU8sRUFBdUIsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDMUcsT0FBTyxFQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQWVuRCxNQUFNLGtDQUFrQyxRQUF3QjtJQUM5RCxJQUFNLG1CQUFtQixHQUEwRCxFQUFFLENBQUM7SUFFdEYsd0JBQXdCO0lBQ3hCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRTVGLHNCQUFzQjtJQUN0QixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRTdFLElBQU0sZUFBZSxHQUFHLHNCQUFzQixDQUFDO1FBQzdDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUk7UUFDeEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLE1BQU0sRUFBRSxJ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c2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21waWxlUGlwZU1ldGFkYXRhLCBpZGVudGlmaWVyTmFtZX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7RGVmaW5pdGlvbktpbmR9IGZyb20gJy4uL2NvbnN0YW50X3Bvb2wnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge091dHB1dENvbnRleHQsIGVycm9yfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtSM0RlcGVuZGVuY3lNZXRhZGF0YSwgY29tcGlsZUZhY3RvcnlGdW5jdGlvbiwgZGVwZW5kZW5jaWVzRnJvbUdsb2JhbE1ldGFkYXRhfSBmcm9tICcuL3IzX2ZhY3RvcnknO1xuaW1wb3J0IHtJZGVudGlmaWVycyBhcyBSM30gZnJvbSAnLi9yM19pZGVudGlmaWVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNQaXBlTWV0YWRhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IG8uRXhwcmVzc2lvbjtcbiAgcGlwZU5hbWU6IHN0cmluZztcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFbXTtcbiAgcHVyZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM1BpcGVEZWYge1xuICBleHByZXNzaW9uOiBvLkV4cHJlc3Npb247XG4gIHR5cGU6IG8uVHlwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVQaXBlRnJvbU1ldGFkYXRhKG1ldGFkYXRhOiBSM1BpcGVNZXRhZGF0YSkge1xuICBjb25zdCBkZWZpbml0aW9uTWFwVmFsdWVzOiB7a2V5OiBzdHJpbmcsIHF1b3RlZDogYm9vbGVhbiwgdmFsdWU6IG8uRXhwcmVzc2lvbn1bXSA9IFtdO1xuXG4gIC8vIGUuZy4gYG5hbWU6ICdteVBpcGUnYFxuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ25hbWUnLCB2YWx1ZTogby5saXRlcmFsKG1ldGFkYXRhLnBpcGVOYW1lKSwgcXVvdGVkOiBmYWxzZX0pO1xuXG4gIC8vIGUuZy4gYHR5cGU6IE15UGlwZWBcbiAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXk6ICd0eXBlJywgdmFsdWU6IG1ldGFkYXRhLnR5cGUsIHF1b3RlZDogZmFsc2V9KTtcblxuICBjb25zdCB0ZW1wbGF0ZUZhY3RvcnkgPSBjb21waWxlRmFjdG9yeUZ1bmN0aW9uKHtcbiAgICBuYW1lOiBtZXRhZGF0YS5uYW1lLFxuICAgIGZuT3JDbGFzczogbWV0YWRhdGEudHlwZSxcbiAgICBkZXBzOiBtZXRhZGF0YS5kZXBzLFxuICAgIHVzZU5ldzogdHJ1ZSxcbiAgICBpbmplY3RGbjogUjMuZGlyZWN0aXZlSW5qZWN0LFxuICB9KTtcbiAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXk6ICdmYWN0b3J5JywgdmFsdWU6IHRlbXBsYXRlRmFjdG9yeSwgcXVvdGVkOiBmYWxzZX0pO1xuXG4gIC8vIGUuZy4gYHB1cmU6IHRydWVgXG4gIGRlZmluaXRpb25NYXBWYWx1ZXMucHVzaCh7a2V5OiAncHVyZScsIHZhbHVlOiBvLmxpdGVyYWwobWV0YWRhdGEucHVyZSksIHF1b3RlZDogZmFsc2V9KTtcblxuICBjb25zdCBleHByZXNzaW9uID0gby5pbXBvcnRFeHByKFIzLmRlZmluZVBpcGUpLmNhbGxGbihbby5saXRlcmFsTWFwKGRlZmluaXRpb25NYXBWYWx1ZXMpXSk7XG4gIGNvbnN0IHR5cGUgPSBuZXcgby5FeHByZXNzaW9uVHlwZShvLmltcG9ydEV4cHIoUjMuUGlwZURlZiwgW1xuICAgIG5ldyBvLkV4cHJlc3Npb25UeXBlKG1ldGFkYXRhLnR5cGUpLFxuICAgIG5ldyBvLkV4cHJlc3Npb25UeXBlKG5ldyBvLkxpdGVyYWxFeHByKG1ldGFkYXRhLnBpcGVOYW1lKSksXG4gIF0pKTtcbiAgcmV0dXJuIHtleHByZXNzaW9uLCB0eXBlfTtcbn1cblxuLyoqXG4gKiBXcml0ZSBhIHBpcGUgZGVmaW5pdGlvbiB0byB0aGUgb3V0cHV0IGNvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlUGlwZUZyb21SZW5kZXIyKFxuICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgcGlwZTogQ29tcGlsZVBpcGVNZXRhZGF0YSwgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yKSB7XG4gIGNvbnN0IGRlZmluaXRpb25NYXBWYWx1ZXM6IHtrZXk6IHN0cmluZywgcXVvdGVkOiBib29sZWFuLCB2YWx1ZTogby5FeHByZXNzaW9ufVtdID0gW107XG5cbiAgY29uc3QgbmFtZSA9IGlkZW50aWZpZXJOYW1lKHBpcGUudHlwZSk7XG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiBlcnJvcihgQ2Fubm90IHJlc29sdmUgdGhlIG5hbWUgb2YgJHtwaXBlLnR5cGV9YCk7XG4gIH1cblxuICBjb25zdCBtZXRhZGF0YTogUjNQaXBlTWV0YWRhdGEgPSB7XG4gICAgbmFtZSxcbiAgICBwaXBlTmFtZTogcGlwZS5uYW1lLFxuICAgIHR5cGU6IG91dHB1dEN0eC5pbXBvcnRFeHByKHBpcGUudHlwZS5yZWZlcmVuY2UpLFxuICAgIGRlcHM6IGRlcGVuZGVuY2llc0Zyb21HbG9iYWxNZXRhZGF0YShwaXBlLnR5cGUsIG91dHB1dEN0eCwgcmVmbGVjdG9yKSxcbiAgICBwdXJlOiBwaXBlLnB1cmUsXG4gIH07XG5cbiAgY29uc3QgcmVzID0gY29tcGlsZVBpcGVGcm9tTWV0YWRhdGEobWV0YWRhdGEpO1xuXG4gIGNvbnN0IGRlZmluaXRpb25GaWVsZCA9IG91dHB1dEN0eC5jb25zdGFudFBvb2wucHJvcGVydHlOYW1lT2YoRGVmaW5pdGlvbktpbmQuUGlwZSk7XG5cbiAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChuZXcgby5DbGFzc1N0bXQoXG4gICAgICAvKiBuYW1lICovIG5hbWUsXG4gICAgICAvKiBwYXJlbnQgKi8gbnVsbCxcbiAgICAgIC8qIGZpZWxkcyAqL1tuZXcgby5DbGFzc0ZpZWxkKFxuICAgICAgICAgIC8qIG5hbWUgKi8gZGVmaW5pdGlvbkZpZWxkLFxuICAgICAgICAgIC8qIHR5cGUgKi8gby5JTkZFUlJFRF9UWVBFLFxuICAgICAgICAgIC8qIG1vZGlmaWVycyAqL1tvLlN0bXRNb2RpZmllci5TdGF0aWNdLFxuICAgICAgICAgIC8qIGluaXRpYWxpemVyICovIHJlcy5leHByZXNzaW9uKV0sXG4gICAgICAvKiBnZXR0ZXJzICovW10sXG4gICAgICAvKiBjb25zdHJ1Y3Rvck1ldGhvZCAqLyBuZXcgby5DbGFzc01ldGhvZChudWxsLCBbXSwgW10pLFxuICAgICAgLyogbWV0aG9kcyAqL1tdKSk7XG59XG4iXX0=