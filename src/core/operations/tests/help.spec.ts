import { Strings } from 'tsbase';
import { Mock, Times } from 'tsmockit';
import { CommandMap, Commands } from '../../commands';
import { HelpOperation } from '../help';

describe('HelpOperation', () => {
  let classUnderTest: HelpOperation;
  const mockConsole = new Mock<Console>();

  beforeEach(() => {
    mockConsole.Setup(c => c.log(Strings.Empty));
    classUnderTest = new HelpOperation(mockConsole.Object);
  });

  it('should construct', () => {
    expect(classUnderTest).toBeDefined();
    expect(new HelpOperation()).toBeDefined();
  });

  it('should execute without args, and log info for every command', () => {
    classUnderTest.Execute();
    mockConsole.Verify(c => c.log(Strings.Empty), CommandMap.size);
  });

  it('should execute with args, and only log the given command', () => {
    classUnderTest.Execute([Commands.Help]);
    mockConsole.Verify(c => c.log(Strings.Empty), Times.Once);
  });

  it('should execute with args, and log a warning when the given command is unknown', () => {
    mockConsole.Setup(s => s.warn(Strings.Empty));
    classUnderTest.Execute(['fake']);
    mockConsole.Verify(c => c.log(Strings.Empty), Times.Never);
    mockConsole.Verify(c => c.warn(Strings.Empty), Times.Once);
  });
});
