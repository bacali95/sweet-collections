import { readFileSync } from 'fs';

export function getData(): Record<string, number> {
    return JSON.parse(readFileSync('benchmark/data.json').toString('utf-8'));
}
