import { CommandInt } from '../interfaces/CommandInt';
import { help } from './help';
import { thirtyDays } from './thirtyDays';
import { view } from './view';

export const CommandList: CommandInt[] = [thirtyDays, view, help];
