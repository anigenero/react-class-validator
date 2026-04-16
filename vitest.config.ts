import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        swc.vite({
            jsc: {
                parser: {
                    syntax: 'typescript',
                    tsx: true,
                    decorators: true,
                },
                transform: {
                    react: {
                        runtime: 'automatic',
                    },
                    legacyDecorator: true,
                    decoratorMetadata: true,
                },
                target: 'es2022',
            },
        }),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/__tests__/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['lcov', 'html'],
            exclude: ['node_modules', 'src/__tests__'],
        },
    },
});
