import { AsyncCommand, Result } from 'tsbase';
import { GeneratorMap, Generators } from './generators/module';
import { IOperation } from './operation';

export class GenerateOperation implements IOperation {
  public async Execute(args: string[]): Promise<Result> {
    return await new AsyncCommand(async () => {
      const generatorName = args[0];
      const remainingArgs = args.slice(1, args.length);

      const generator = GeneratorMap.get(generatorName as Generators);

      if (generator) {
        generator.Generate(remainingArgs);
      } else {
        const error = `Unknown generator, "${generatorName}"`;
        console.error(error);
        throw new Error(error);
      }
    }).Execute();
  }
}
