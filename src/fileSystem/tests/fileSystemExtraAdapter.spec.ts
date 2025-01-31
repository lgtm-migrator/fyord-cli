import { FileSystemExtraDryRunAdapter } from '../fileSystemExtraAdapter';

describe('FileSystemExtraAdapter', () => {
  it('should log calls to outputFile', () => {
    const logSpy = spyOn(console, 'log');
    FileSystemExtraDryRunAdapter.outputFile('test', '');
    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});
