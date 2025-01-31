import { Strings } from 'tsbase';
import { Any, Mock, Times } from 'tsmockit';
import { setupSettingsServiceForTests } from '../../../setupSettingsServiceForTests';

setupSettingsServiceForTests();

import { CommandMap, Commands } from '../../commands';
import { HelpOperation } from '../help';

describe('HelpOperation', () => {
  let classUnderTest: HelpOperation;
  const mockConsole = new Mock<Console>();

  beforeEach(() => {
    spyOn(console, 'log');
    mockConsole.Setup(c => c.log(Any<string>()));
    classUnderTest = new HelpOperation(mockConsole.Object);
  });

  it('should construct', () => {
    expect(classUnderTest).toBeDefined();
    expect(new HelpOperation()).toBeDefined();
  });

  it('should execute without args, and log info for every command', async () => {
    await classUnderTest.Execute();
    mockConsole.Verify(c => c.log(Strings.Empty), CommandMap.size + 1);
  });

  it('should execute with args, and only log the given command', async () => {
    await classUnderTest.Execute([Commands.Help]);
    mockConsole.Verify(c => c.log(Strings.Empty), Times.Once);
  });

  it('should execute with args, and log a warning when the given command is unknown', async () => {
    mockConsole.Setup(s => s.error(Any<string>()));
    await classUnderTest.Execute(['fake']);
    mockConsole.Verify(c => c.log(Strings.Empty), Times.Never);
    mockConsole.Verify(c => c.error(Strings.Empty), Times.Once);
  });

  it('should execute with args and log additional details for the given command', async () => {
    await classUnderTest.Execute([Commands.Generate]);
    mockConsole.Verify(c => c.log(Strings.Empty), 3);
  });
});
