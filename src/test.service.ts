import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class SomeService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async doSomething() {
    const { TestModule } = await import('./test.module');
    const moduleRef = await this.lazyModuleLoader.load(() => TestModule);
  }
}
