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
      cy.wait(100);
      cy.get('video').then((video) => {
        expect(video[0].paused).to.be.false;
      });
      cy.get('#pauseBtn').click();
      cy.wait(100);
      cy.get('video').then((video) => {
        expect(video[0].paused).to.be.true;
      });
    });

    it('can forward the video by 1 second', () => {
      cy.get('video').then(video => {
        const initialTime = video[0].currentTime;
        cy.get('#forwardBtn').click();
        cy.wait(100);
        cy.get('video').then(v => {
          expect(v[0].currentTime).to.be.closeTo(initialTime + 1, 0.5);
        });
      });
    });
  
    it('can rewind the video by 1 second', () => {
      cy.get('video').then(video => {
        video[0].currentTime = 2;
      });
      cy.get('#rewindBtn').click();
      cy.wait(100);
      cy.get('video').then(video => {
        expect(video[0].currentTime).to.be.closeTo(1, 0.5);
      });
    });
});