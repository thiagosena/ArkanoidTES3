function Song(){
}

Song.prototype.startBackgroundMusic = function(){
	this.currentlyPlayingSong = document.getElementById('ambient').play();
	this.isPlaying = true;
}

Song.prototype.playDestroySound = function(){
	this.currentlyPlayingSong = document.getElementById('destroy').play();
	this.isPlaying = true;
}