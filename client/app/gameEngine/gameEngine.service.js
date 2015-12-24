'use strict';

angular.module('gameofnodesClientNewestTryApp')
  .service('gameEngine', gameEngineService);

gameEngineService.$inject = ['$http', 'appConfig', 'localStorageService'];

/** Core of the game. */
function gameEngineService($http, appConfig, localStorageService) {
  var service             = {}
  ,   roundWinsForVictory = appConfig.roundWinsForVictory
  ,   winListStorageName  = appConfig.winListStorageName;

  service.player1           = null;
  service.player2           = null;
  service.rules             = null;
  service.currentPlayerName = null;
  service.currentRound      = null;
  service.end               = null;
  service.gameLog           = [];

  // Set functions.
  service.init                 = init;
  service.executeMove          = executeMove;
  service.getGameLog           = getGameLog;
  service.getRules             = getRules;
  service.getWinListByWinCount = getWinListByWinCount;
  service.decideWinner         = decideWinner;
  service.isGameOver           = isGameOver;
  service.updateServerStats    = updateServerStats;
  service.resetGameValues      = resetGameValues;

  service.resetGameValues();

  return service;

  /**
   * Executes a move chosen by a player.
   *
   * @param {string} playerName Name of the player.
   * @param {object} move Move chosen by the player.
   */
  function executeMove(playerName, move) {

    if (playerName == this.player1.name) {
      // Update game values.
      this.player1.lastMove  = move;
      this.currentPlayerName = this.player2.name;

      return { currentPlayerName: this.currentPlayerName, currentRound: this.currentRound };
    }
    else if (playerName == this.player2.name) {
      // Update game values.
      this.player2.lastMove  = move;
      this.currentPlayerName = this.player1.name;

      var winnerName = this.decideWinner(this.player1.lastMove, this.player2.lastMove);

      // Update game log.
      this.gameLog.push({ round: this.currentRound, winner: winnerName });

      // Increase score, if appropriate.
      if (this.player1.name == winnerName)
        this.player1.score++;
      else if (this.player2.name == winnerName)
        this.player2.score++;

      // Game over? Declare winner and move on.
      if (this.isGameOver()) {
        this.end = true;
        this.updateServerStats(winnerName);

        return { winner: winnerName };
      }

      this.currentRound++;

      return { currentPlayerName: this.currentPlayerName, currentRound: this.currentRound, 
             winner: winnerName };
    }
  }

  /**
   * Updates the win count of the parameter player on the server.
   *
   * @param {string} playerName Name of the player whose stats are to be updated.
   */
  function updateServerStats(playerName) {
    var winList               = localStorageService.get(winListStorageName)
    ,   indexOfPreviousCount  = -1;

    if (winList === null)
      winList = [];
    else if (typeof winList === 'string')
      winList = JSON.parse(winList);

    indexOfPreviousCount = winList.findIndex(function (element, index, array) {
      return (element.name === playerName);
    });

    if (indexOfPreviousCount === -1)
      winList.push({ name: playerName, count: 1 });
    else
      winList[indexOfPreviousCount] = { name: playerName, count: (winList[indexOfPreviousCount].count + 1) };

    localStorageService.set(winListStorageName, JSON.stringify(winList));
  }

  function isGameOver() {
    return ((this.player1.score >= roundWinsForVictory) || (this.player2.score >= roundWinsForVictory));
  }

  /**
   * Decides the outcome of a match, given the player's moves.
   *
   * @param {object} player1Move Move that was chosen by the player 1.
   * @param {object} player2Move Move that was chosen by the player 2.
   * @return {string} Name of the winner player or string 'draw'.
   */
  function decideWinner(player1Move, player2Move) {
    // Check that the other player's move is in the beats array.
    if (player1Move.beats.indexOf(player2Move.name) >= 0)
      return this.player1.name;
    else if (player2Move.beats.indexOf(player1Move.name) >= 0)
      return this.player2.name;
    else
      return 'draw';
  }

  function getGameLog() {
      return this.gameLog;
  }

  function getRules() {
      return this.rules;
  }

  function getWinListByWinCount() {
    var winList = localStorageService.get(winListStorageName);

    if (winList === null)
      return [];
    else
      return JSON.parse(winList).sort(function compare(a, b) { return (b.count - a.count) ; });
  }

  /**
   * Gets the game up to speed, by providing the player's names and the rules to use.
   *
   * @param {string} player1Move Name of player 1.
   * @param {string} player2Move Name of player 2.
   * @param {array} rules Rules to use in this game execution.
   */
  function init(player1Name, player2Name, rules) {
      this.resetGameValues();

      // Set values of current game.
      this.currentPlayerName = player1Name;
      this.player1.name      = player1Name;
      this.player2.name      = player2Name;

      // Default game rules.
      if (rules === undefined)
        this.rules = [
                        { name: 'paper',    beats: [ 'rock' ] },
                        { name: 'rock',     beats: [ 'scissors' ] },
                        { name: 'scissors', beats: [ 'paper' ] }
                      ];
      // Server rules.
      else
        this.rules = rules;
  }

  /**
   * Resets the internal variables of the game engine, in order to leave it ready for 
   * a new execution.
   *
   */
  function resetGameValues() {
    // Player data.
    this.player1 = { name: null, score: 0, lastMove: null };
    this.player2 = { name: null, score: 0, lastMove: null };

    // Game rules.
    this.rules = [];

    // Current round data.
    this.currentPlayerName = null;
    this.currentRound      = 1;
    this.end               = false;

    // Game log.
    this.gameLog = [];
  }
}
