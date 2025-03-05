(() => {
    "use strict";
    console.log('reading js');

    const allTiles = document.querySelectorAll('.tile');
    const allTileIDs = [];
    console.log(allTiles.length);
    // populate ids string
    for(let i=0; i<allTiles.length; i++){
        allTileIDs[i] = allTiles[i].getAttribute('id');
    } // TO DO: acces each action-list item and change the color on hover based on the parent tile's id name

    // this handles icon hover states
    const icons = document.querySelectorAll('.icon-box');
    for(let i = 0; i<icons.length; i++){
        let thisIcon = icons[i];
        thisIcon.addEventListener('mouseover', () => {
            thisIcon.style.backgroundColor = 'var(--default-darker)';
        });
        thisIcon.addEventListener('mouseout', () => {
            thisIcon.style.backgroundColor = '';
        });
    }
})();