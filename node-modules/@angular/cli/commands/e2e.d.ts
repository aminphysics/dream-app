/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ArchitectCommand, ArchitectCommandOptions } from '../models/architect-command';
import { CommandScope, Option } from '../models/command';
export declare class E2eCommand extends ArchitectCommand {
    readonly name: string;
    readonly target: string;
    readonly description: string;
    static aliases: string[];
    static scope: CommandScope;
    readonly multiTarget: boolean;
    readonly options: Option[];
    run(options: ArchitectCommandOptions): Promise<number>;
}
