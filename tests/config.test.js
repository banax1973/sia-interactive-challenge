describe('Config validation', () => {
    const OLD_ENV = process.env;
    
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });
    
    afterEach(() => {
      process.env = OLD_ENV;
    });
  
    it('loads config when required env vars are set', async () => {
        process.env.NODE_ENV = 'test';
        process.env.LATITUDE = '1';
        process.env.LONGITUDE = '2';
    
        const { PORT, LATITUDE, LONGITUDE, TEMPERATURE_INTERVAL } = await import('../config.js');
        expect(PORT).toBeDefined();
        expect(LATITUDE).toBe(1);
        expect(LONGITUDE).toBe(2);
        expect(TEMPERATURE_INTERVAL).toBeDefined();
    });

    it('throws error when required env missing', async () => {
      process.env.NODE_ENV = 'test';
      await expect(import('../config.js'))
        .rejects
        .toThrow(/Config validation error/);
    });
  });