http://localhost:3000/game/8835ec0f-6c0e-409d-86c6-d31fd47a38c1

Match Status

- waiting
  Partida criada mas aguardando outro jogador
  Status inicial quando uma partida é criada
- Playing
  Partida em andamento, é alterado quando outro jogador entra na partida
- Finished
  Partida finalizada temos um vencedor

Game Status

- Choosing_creatures
  Ambos os jogadores estão posicionando suas criatura no campo, status inicial assim que a partida inicial
- select_duel
  Jogador vai selecionar uma criatura dele e do oponente para duelar
- duel
  As criaturas estão em duelo, no final volta para o status de select_duel ate um dos jogadores não ter mais criaturas

choosing_creatures | select_duel | duel
