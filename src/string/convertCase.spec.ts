import { describe, expect, test } from 'vitest';
import { convertCase, detectStringCase, type StringCase } from './convertCase';

describe('detectStringCase', () => {
  test('detects camel case', () => {
    expect(detectStringCase('camelCaseExample')).toBe('camel');
  });
  test('detects kebab case', () => {
    expect(detectStringCase('kebab-case-example')).toBe('kebab');
  });
  test('detects lower case', () => {
    expect(detectStringCase('lower case example')).toBe('lower');
    expect(detectStringCase('lower')).toBe('lower');
  });
  test('detects pascal case', () => {
    expect(detectStringCase('PascalCaseExample')).toBe('pascal');
  });
  test('detects snake case', () => {
    expect(detectStringCase('snake_case_example')).toBe('snake');
  });
  test('detects title case', () => {
    expect(detectStringCase('Title Case Example')).toBe('title');
  });
  test('detects upper case', () => {
    expect(detectStringCase('UPPER CASE EXAMPLE')).toBe('upper');
    expect(detectStringCase('UPPER')).toBe('upper');
  });
  test('returns unknown on kebab case with uppercase', () => {
    expect(detectStringCase('Kebab-Case-With-Uppercase')).toBe('unknown');
  });
  test('returns unknown on invalid title case', () => {
    expect(detectStringCase('inVaLid Title CasE')).toBe('unknown');
  });
  test('returns unknown on snake case with uppercase', () => {
    expect(detectStringCase('Snake_Case_With_Uppercase')).toBe('unknown');
  });
  test('returns unknown on title case mixed with lower', () => {
    expect(detectStringCase('title Case Mixed With lower')).toBe('unknown');
  });
});

type ValidStringCase = Exclude<StringCase, 'unknown'>;

describe('convertCase', () => {
  const examples: Record<ValidStringCase, string> = {
    camel: 'someStringExample',
    kebab: 'some-string-example',
    lower: 'some string example',
    pascal: 'SomeStringExample',
    snake: 'some_string_example',
    title: 'Some String Example',
    upper: 'SOME STRING EXAMPLE',
  };
  const cases = Object.keys(examples) as ValidStringCase[];

  for (const inputCase of cases) {
    for (const outputCase of cases.filter((c) => c !== inputCase)) {
      test(`converts from ${inputCase} to ${outputCase}`, () => {
        expect(convertCase(inputCase, outputCase, examples[inputCase])).toEqual(examples[outputCase]);
      });
    }
  }
});
