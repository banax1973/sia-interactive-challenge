describe('Video sync & Clima E2E', () => {
    beforeEach(() => {
      cy.visitApp();
    });
  
    it('loads the page and shows video & temperature sections', () => {
      cy.get('#channel1 video').should('exist');
      cy.get('#channel2').should('contain.text', '°C');
    });
  
    it('can play and pause the video', () => {
      cy.get('#playBtn').click();
      cy.get('video').then((video) => {
        expect(video[0].paused).to.be.false;
      });
      cy.get('#pauseBtn').click();
      cy.get('video').then((video) => {
        expect(video[0].paused).to.be.true;
      });
    });
});