export const PARAGRAPHS = {
  1: {
    text: 'Joran t\'a trouvé dans une taverne du dernier village avant la lande, et t\'a payé une tournée avant même de te dire son nom. « Ma sœur, Élyne. Trois nuits qu\'elle a disparu — enlevée par des cavaliers sans visage, sortis du brouillard comme s\'ils en étaient faits. » Tout le monde ici sait où ils l\'ont emmenée : au sommet de la colline pelée, derrière les arbres morts, se dresse Château Vaudragne — et sa maîtresse, la Comtesse, qui règne sur ces terres depuis si longtemps que plus personne ne sait dire si elle est encore vivante, ou seulement debout.\n\nOn raconte qu\'elle se nourrit de jeunesse pour prolonger la sienne, volée depuis un siècle à la mort qui aurait dû la prendre. La prochaine lune rousse se lève dans deux nuits — et avec elle, dit-on, le rituel qui doit sceller sa survie pour cent ans de plus, au prix d\'une vie neuve. Joran n\'a pas assez d\'or pour payer un vrai sauvetage, mais il a une carte de la lande, un regard désespéré, et ta seule vraie qualification : tu es encore vivant après être descendu dans des endroits que d\'autres évitent.\n\nTu acceptes. La route jusqu\'au château prend le reste du jour, à travers une forêt de plus en plus silencieuse — pas d\'oiseaux, pas de vent dans les branches mortes, seulement le bruit de tes propres pas. À la tombée du soir, les tours de Château Vaudragne se découpent enfin contre un ciel déjà teinté d\'un rouge qui n\'a rien à voir avec le crépuscule.',
    choices: [{ label: 'Poursuivre vers le château', targetId: 5 }],
  },
  5: {
    text: 'À la lisière du bois, à l\'ombre d\'un vieux chêne foudroyé, un petit autel de pèlerin oublié porte encore une fiole scellée — un élixir de vigueur, déposé là par on ne sait quel voyageur superstitieux avant toi. La colline du château se dresse juste au-delà, nue et grise.',
    choices: [
      { label: 'Prendre la fiole et poursuivre', targetId: 2, grantItem: 'elixir_soin' },
      { label: 'Poursuivre sans t\'attarder', targetId: 2 },
    ],
  },
  2: {
    text: 'Château Vaudragne se dresse devant toi, ses tours rongées par le lierre noir, une seule fenêtre encore éclairée tout en haut du donjon d\'une lueur rouge et vacillante. Trois chemins s\'offrent à toi. La grande porte, éclairée de torches, où des gardes en armure ternie surveillent sans grande conviction. Une brèche ancienne dans le mur d\'enceinte, à l\'est, assez large pour un homme déterminé. Et, dissimulée sous un rideau de lierre à l\'ouest, une poterne que tu ne devrais pas être capable de repérer d\'ici — et que tu repères pourtant.\n\nCe choix décidera de la première heure de ta nuit à Vaudragne — et de la réputation qui te précédera une fois à l\'intérieur — mais pas de tout le reste : le château, une fois franchi, reste le même château pour tout le monde.',
    choices: [
      { label: 'Se présenter à la grande porte, en voyageur', targetId: 100 },
      { label: 'Forcer la brèche du mur d\'enceinte', targetId: 200 },
      { label: 'Se glisser par la poterne dissimulée', targetId: 300 },
    ],
  },

  // ================= ENTRÉE : GRANDE PORTE (100-103) =================
  100: {
    text: 'Un garde te bloque le passage avant même que tu n\'atteignes les torches, la main sur la garde de son épée. « Personne ne vient à Château Vaudragne sans y être invité. Qui es-tu, et que veux-tu ? » Il faut une histoire crédible, et vite.',
    luckTest: { successTarget: 101, failTarget: 102 },
  },
  101: {
    text: 'Ton histoire — un érudit itinérant, venu étudier la bibliothèque légendaire de la maison Vaudragne — passe sans le moindre haussement de sourcil. Le garde s\'écarte presque avec déférence, comme si des visiteurs de ton genre n\'étaient pas si rares que ça.',
    choices: [{ label: 'Entrer dans la cour', targetId: 103 }],
  },
  102: {
    text: 'Le garde plisse les yeux, pas entièrement convaincu, mais te laisse passer malgré tout — un ordre reçu d\'en haut, sans doute, de ne jamais refuser un visiteur qui pourrait divertir la maîtresse des lieux. Il te suit du regard un instant de trop.',
    choices: [{ label: 'Entrer dans la cour, sous surveillance', targetId: 103, effect: { stat: 'luck', amount: -1 } }],
  },
  103: {
    text: 'Tu franchis la grande porte sans avoir eu à lever la main, ta couverture de voyageur encore intacte. La cour intérieure s\'ouvre devant toi, étrangement animée pour un château qu\'on dit maudit : des domestiques silencieux vont et viennent entre deux ailes du bâtiment — l\'une résonnant de musique et de conversations policées, l\'autre plus sombre, sentant la pierre humide et le salpêtre. Au fond, un escalier disparaît vers la tour centrale.',
    choices: [
      { label: 'Explorer les ailes nobles du château', targetId: 111 },
      { label: 'Explorer les communs et les sous-sols', targetId: 211 },
      { label: 'Monter directement à la tour, sans plus attendre', targetId: 120 },
    ],
  },

  // ================= ENTRÉE : BRÈCHE (200-203) =================
  200: {
    text: 'Tu te glisses par la brèche du mur d\'enceinte, et deux gardes armés jusqu\'aux dents t\'accueillent aussitôt de l\'autre côté, visiblement postés là pour cette raison précise.',
    combat: { enemy: { name: 'Gardes du mur', icon: '🗡️', skill: 7, stamina: 9 }, winTarget: 201, loseTarget: 551 },
  },
  201: {
    text: 'Le combat terminé, tu remarques une cellule de fortune adossée au mur, où un mercenaire enchaîné — capturé lors d\'une précédente tentative, visiblement — te supplie du regard.',
    choices: [
      { label: 'Le libérer avant de poursuivre', targetId: 203, grantItem: 'fumigene' },
      { label: 'Poursuivre sans t\'attarder', targetId: 203 },
    ],
  },
  203: {
    text: 'Tu traverses la cour extérieure au pas de charge, encore essoufflé du combat, et personne à l\'intérieur ne semble avoir eu vent de l\'alerte — les cris se sont perdus dans l\'épaisseur des murs. La cour intérieure s\'ouvre devant toi : d\'un côté une aile éclairée où résonnent musique et conversations, de l\'autre des communs plus sombres. Au fond, un escalier disparaît vers la tour centrale.',
    choices: [
      { label: 'Explorer les ailes nobles du château', targetId: 111 },
      { label: 'Explorer les communs et les sous-sols', targetId: 211 },
      { label: 'Monter directement à la tour, sans plus attendre', targetId: 120 },
    ],
  },

  // ================= ENTRÉE : POTERNE (300-303) =================
  300: {
    text: 'Le lierre dissimule une poterne étroite, verrouillée mais ancienne — le genre de serrure qui cède à qui sait où appuyer plutôt qu\'à qui force.',
    luckTest: { successTarget: 301, failTarget: 302 },
  },
  301: {
    text: 'La serrure cède sans un bruit, et tu te glisses à l\'intérieur, invisible dans l\'obscurité des communs.',
    choices: [{ label: 'Avancer dans le noir', targetId: 303 }],
  },
  302: {
    text: 'La poterne finit par céder, mais dans un grincement sec, et les ronces du lierre t\'écorchent le bras au passage.',
    choices: [{ label: 'Avancer, blessé, dans le noir', targetId: 303, effect: { stat: 'stamina', amount: -2 } }],
  },
  303: {
    text: 'Tu te glisses sans un bruit dans les communs du château, une ombre parmi les ombres. De là, un couloir de service permet de rejoindre discrètement aussi bien les ailes nobles que les sous-sols, et un escalier dérobé semble filer directement vers la tour centrale.',
    choices: [
      { label: 'Explorer les ailes nobles du château', targetId: 111 },
      { label: 'Explorer les communs et les sous-sols', targetId: 211 },
      { label: 'Monter directement à la tour, sans plus attendre', targetId: 120 },
    ],
  },

  // ================= AILE NOBLE (111-130) =================
  111: {
    text: 'L\'aile noble se divise en deux : la grande salle, où le sénéchal reçoit officiellement les visiteurs de marque, et plus loin, un bal masqué qui bat son plein malgré l\'heure tardive, une musique étrange jouée par des musiciens qui ne semblent jamais reprendre leur souffle.',
    choices: [
      { label: 'Se présenter formellement au sénéchal', targetId: 112 },
      { label: 'Se mêler aux invités du bal masqué', targetId: 118 },
    ],
  },
  112: {
    text: 'Le sénéchal t\'accueille dans la grande salle avec une politesse glaciale, ses yeux pâles ne te lâchant pas un instant. « Voyons si vous méritez qu\'on vous laisse aller plus loin dans cette maison. »',
    luckTest: { successTarget: 113, failTarget: 114 },
  },
  113: {
    text: 'Tes réponses, aussi improvisées soient-elles, semblent l\'impressionner sincèrement. « La bibliothèque est au premier étage, dans l\'aile ouest. Ne dérangez pas le chapelain plus que nécessaire — il n\'apprécie pas la compagnie. »',
    choices: [{ label: 'Se rendre à la bibliothèque', targetId: 115 }],
  },
  114: {
    text: 'Le sénéchal n\'est pas dupe, mais il ne dit rien — se contentant d\'assigner discrètement un serviteur à te « guider », c\'est-à-dire te surveiller. Autant d\'yeux en plus sur toi que tu devras apprendre à ignorer.',
    choices: [{ label: 'Se rendre à la bibliothèque, sous escorte', targetId: 115, effect: { stat: 'luck', amount: -1 } }],
  },
  115: {
    text: 'La bibliothèque est vaste, poussiéreuse, et occupée par un chapelain voûté qui étudie de vieux grimoires à la lueur d\'une chandelle. Il lève à peine les yeux. « Un visiteur de plus, venu se repaître des secrets de cette maison. Prouvez-moi que vous méritez d\'en connaître au moins un. »',
    luckTest: { successTarget: 116, failTarget: 117 },
  },
  116: {
    text: 'Quelque chose dans tes réponses touche le vieux chapelain. Il te tend, presque à contrecœur, un parchemin copié de sa propre main : un rite capable, dit-il, de dissoudre la malédiction de la Comtesse sans qu\'une seule goutte de sang ne soit versée. « Utilisez-le avec justesse. Une seule fois suffira, ou aucune. »',
    choices: [{ label: 'Prendre le parchemin et poursuivre', targetId: 130, grantItem: 'parchemin_rituel' }],
  },
  117: {
    text: 'Le chapelain te démasque en un instant et appelle les gardes d\'une voix éraillée avant que tu n\'aies pu esquisser une retraite digne.',
    combat: { enemy: { name: 'Garde du corps du sénéchal', icon: '🛡️', skill: 7, stamina: 7 }, winTarget: 130, loseTarget: 560 },
  },
  118: {
    text: 'Une dame masquée, visiblement au fait des affaires de la maison, accepte de danser avec toi — et de parler, si tu sais l\'amener sur le bon sujet sans éveiller ses soupçons.',
    luckTest: { successTarget: 119, failTarget: 129 },
  },
  119: {
    text: 'Elle se laisse convaincre de t\'en dire bien plus qu\'elle ne le devrait, avant de glisser dans ta main, presque en riant, un sceau de cire aux armes de la maison Vaudragne. « Montrez ceci à qui vous barre la route, et on vous laissera passer sans poser de questions. »',
    choices: [{ label: 'Prendre le sceau et poursuivre', targetId: 130, grantItem: 'sceau_vaudragne' }],
  },
  129: {
    text: 'Tu poses une question de trop. La dame masquée se raidit, et tu sens plusieurs regards se tourner vers toi dans la salle. Tu t\'éclipses avant que la situation ne s\'envenime davantage.',
    choices: [{ label: 'Quitter discrètement le bal', targetId: 130, effect: { stat: 'luck', amount: -1 } }],
  },
  130: {
    text: 'Tu as recueilli dans l\'aile noble ce qu\'elle avait à offrir cette nuit. Les communs du château, de l\'autre côté de la cour, ont sans doute encore des choses à te révéler — ou alors il est temps de rejoindre directement la tour.',
    choices: [
      { label: 'Explorer aussi les communs et les sous-sols', targetId: 211 },
      { label: 'Monter à la tour', targetId: 120 },
    ],
  },

  // ================= COMMUNS ET SOUS-SOLS (211-230) =================
  211: {
    text: 'Les communs s\'étendent en deux directions : l\'armurerie du corps de garde, où traîne encore l\'équipement des générations de soldats de la maison Vaudragne, et un escalier qui plonge vers les caves, les celliers, et plus bas encore, les cachots.',
    choices: [
      { label: 'Fouiller l\'armurerie', targetId: 212 },
      { label: 'Descendre vers les caves et les cachots', targetId: 220 },
    ],
  },
  212: {
    text: 'L\'armurerie est à moitié pillée, mais une épée d\'argent finement ouvragée, gravée de symboles d\'inquisiteurs, attend encore sur son râtelier — comme si personne n\'avait osé la toucher.',
    choices: [{ label: 'Prendre l\'épée et poursuivre', targetId: 213, grantItem: 'epee_benie' }],
  },
  213: {
    text: 'Une sentinelle revient inspecter l\'armurerie au pire moment possible, découvrant le râtelier vide et toi encore dedans.',
    combat: { enemy: { name: 'Sentinelle de l\'armurerie', icon: '🛡️', skill: 8, stamina: 8 }, winTarget: 214, loseTarget: 552 },
  },
  214: {
    text: 'Tu as ce que tu cherchais dans l\'armurerie. Les caves et les cachots, plus bas, ont peut-être encore leur mot à dire — ou il est temps de ressortir des communs.',
    choices: [
      { label: 'Descendre aussi vers les caves et les cachots', targetId: 220 },
      { label: 'Ressortir des communs', targetId: 230 },
    ],
  },
  220: {
    text: 'L\'escalier des caves se divise à son tour : un cellier voûté, où flotte une odeur âcre de distillation, et un vieux puits désaffecté qui semble plonger directement vers les niveaux les plus bas.',
    choices: [
      { label: 'Fouiller le cellier', targetId: 221 },
      { label: 'Descendre par le puits désaffecté', targetId: 226 },
    ],
  },
  221: {
    text: 'Le cellier sert visiblement de petite distillerie improvisée : une fiole de poison, soigneusement étiquetée d\'un crâne, attend sur une étagère comme si quelqu\'un ici en avait un usage régulier.',
    choices: [{ label: 'Prendre la fiole et poursuivre', targetId: 222, grantItem: 'fiole_poison' }],
  },
  222: {
    text: 'Un garde ivre, endormi contre un tonneau, remue dans son sommeil au bruit de tes pas.',
    luckTest: { successTarget: 227, failTarget: 224 },
  },
  224: {
    text: 'Il se réveille en sursaut et porte la main à son arme avant même d\'avoir les idées claires, ce qui ne lui laisse pas beaucoup d\'options.',
    combat: { enemy: { name: 'Garde ivre', icon: '🍺', skill: 6, stamina: 6 }, winTarget: 227, loseTarget: 556 },
  },
  226: {
    text: 'Le puits est à sec depuis longtemps, une corde à demi pourrie pendant encore le long de la paroi. La descente s\'annonce longue et incertaine.',
    luckTest: { successTarget: 227, failTarget: 557, failEffect: { stat: 'stamina', amount: -9999 }, deathTarget: 557 },
  },
  227: {
    text: 'Tu atteins les niveaux inférieurs et débouches sur les cachots du château, patrouillés par une sentinelle en armure animée dont les mouvements saccadés trahissent une magie ancienne plutôt qu\'un cœur qui bat.',
    luckTest: { successTarget: 240, failTarget: 241 },
  },
  241: {
    text: 'La sentinelle s\'arrête net, tourne lentement son heaume vide vers toi, et lève sa hallebarde sans un mot.',
    combat: { enemy: { name: 'Sentinelle des cachots', icon: '🗿', skill: 8, stamina: 8 }, winTarget: 240, loseTarget: 558 },
  },
  240: {
    text: 'Tu trouves la cellule où Élyne a été enfermée — vide, la paille encore tiède, une écuelle à peine entamée. On l\'a déplacée récemment, sans doute vers la tour pour le rituel. Sur le sol traîne une lourde clé de fer, oubliée par un geôlier négligent.',
    choices: [{ label: 'Prendre la clé et poursuivre', targetId: 242, grantItem: 'cle_cachots' }],
  },
  242: {
    text: 'Tu as fouillé les profondeurs du château. L\'armurerie, plus haut dans les communs, n\'a peut-être pas encore livré tous ses secrets — ou il est temps de ressortir.',
    choices: [
      { label: 'Fouiller aussi l\'armurerie', targetId: 212 },
      { label: 'Ressortir des communs', targetId: 230 },
    ],
  },
  230: {
    text: 'Tu as fouillé les communs et les sous-sols autant que la prudence le permettait. L\'aile noble du château, de l\'autre côté de la cour, garde peut-être encore des secrets — ou il est temps de rejoindre directement la tour.',
    choices: [
      { label: 'Explorer aussi les ailes nobles', targetId: 111 },
      { label: 'Monter à la tour', targetId: 120 },
    ],
  },

  // ================= PORTE DE LA TOUR (120-140) =================
  120: {
    text: 'Un escalier en colimaçon monte vers la tour, gardé par un chevalier en armure noire qui ne semble ni respirer ni cligner des yeux. Il ne dit rien — il attend simplement de voir ce que tu comptes faire.',
    choices: [
      { label: 'Tenter de passer sans te faire remarquer', targetId: 123 },
      { label: 'Présenter le sceau de Vaudragne comme laissez-passer', targetId: 124, requiresItem: 'sceau_vaudragne' },
      { label: 'Te couvrir de fumée pour te faufiler sans bruit', targetId: 125, requiresItem: 'fumigene' },
      { label: 'Utiliser la clé des cachots pour emprunter un passage détourné', targetId: 126, requiresItem: 'cle_cachots' },
    ],
  },
  123: {
    text: 'Tu retiens ton souffle et avances, espérant que le chevalier te prenne pour un domestique de plus.',
    luckTest: { successTarget: 121, failTarget: 122 },
  },
  124: {
    text: 'Le chevalier examine le sceau un long moment de ses orbites vides, puis s\'écarte en silence, comme si la cire elle-même avait le pouvoir de commander à sa garde éternelle.',
    choices: [{ label: 'Monter l\'escalier', targetId: 121 }],
  },
  125: {
    text: 'Le fumigène explose en un nuage âcre qui avale l\'escalier entier. Le chevalier tourne la tête vers le vide, aveugle, pendant que tu te faufiles sans un bruit.',
    choices: [{ label: 'Monter l\'escalier sous couverture', targetId: 121 }],
  },
  126: {
    text: 'La clé des cachots ouvre une porte dérobée que tu n\'avais pas remarquée, un ancien passage de geôlier menant directement à l\'étage supérieur, loin du regard du chevalier.',
    choices: [{ label: 'Emprunter le passage', targetId: 121 }],
  },
  121: {
    text: 'Tu montes l\'escalier sans encombre, le cœur battant, une porte close t\'attendant tout en haut, sous laquelle filtre une lumière rouge et vacillante.',
    choices: [{ label: 'Approcher de la porte', targetId: 140 }],
  },
  122: {
    text: 'Le chevalier noir se met en mouvement d\'un coup, son épée jaillissant d\'un fourreau que tu n\'avais même pas remarqué.',
    combat: { enemy: { name: 'Chevalier revenant', icon: '🛡️', skill: 8, stamina: 9 }, winTarget: 140, loseTarget: 561 },
  },
  140: {
    text: 'Tu te tiens enfin devant la porte de la chambre haute, essoufflé de tout ce qu\'il t\'a fallu affronter, mentir ou éviter pour en arriver là. De l\'autre côté, un chant sourd, presque une berceuse, se mêle au grondement d\'un rituel déjà bien avancé.',
    choices: [{ label: 'Pousser la porte', targetId: 400 }],
  },

  // ================= AFFRONTEMENT FINAL (400-440) =================
  400: {
    text: 'La chambre haute de la tour s\'ouvre sur un spectacle que rien n\'aurait pu te préparer à affronter calmement : la Comtesse Vaudragne, drapée dans une robe qui semble faite de nuit tissée, se dresse au centre d\'un cercle de runes incandescentes, Élyne évanouie et liée sur un autel de pierre devant elle. Par la rosace brisée, la lune rousse commence tout juste à se lever. « Encore un peu de patience, » murmure la Comtesse sans même se retourner, « et tu pourras assister au spectacle depuis l\'au-delà, comme les autres. »',
    choices: [
      { label: 'Attaquer la Comtesse de front', targetId: 401 },
      { label: 'Frapper avec l\'épée d\'argent bénie', targetId: 403, requiresItem: 'epee_benie' },
      { label: 'Réciter le rite inversé du parchemin', targetId: 405, requiresItem: 'parchemin_rituel' },
      { label: 'Verser le poison dans sa coupe rituelle', targetId: 407, requiresItem: 'fiole_poison' },
      { label: 'Reculer — c\'est trop risqué', targetId: 440 },
    ],
  },
  401: {
    text: 'Tu te jettes dans la bataille sans autre arme que ta détermination. La Comtesse se retourne enfin, un sourire sans chaleur aux lèvres, et le combat s\'engage dans le vacarme du rituel interrompu.',
    combat: { enemy: { name: 'La Comtesse Vaudragne', icon: '👑', skill: 10, stamina: 13 }, winTarget: 410, loseTarget: 562, boss: true },
  },
  403: {
    text: 'L\'épée d\'argent bénie s\'illumine faiblement à l\'approche de la Comtesse, comme si le métal lui-même reconnaissait son ennemie. Elle recule d\'instinct devant la lame, sifflant de douleur avant même le premier coup.',
    combat: { enemy: { name: 'La Comtesse Vaudragne, blessée par le fer', icon: '👑', skill: 8, stamina: 9 }, winTarget: 411, loseTarget: 563, boss: true },
  },
  405: {
    text: 'Tu déroules le parchemin et récites le rite inversé d\'une voix que tu espères assurée, chaque mot semblant peser plus lourd que le précédent. Le cercle de runes vacille, hésite, comme si la réalité elle-même se demandait quelle version d\'elle-même choisir.',
    luckTest: { successTarget: 425, failTarget: 406 },
  },
  406: {
    text: 'Le rite se retourne à moitié contre toi, et la Comtesse hurle de rage plus que de douleur, sa forme se déformant sous la fureur du sortilège mal maîtrisé — mais bien réel, et prête à se battre.',
    combat: { enemy: { name: 'La Comtesse Vaudragne, enragée', icon: '👑', skill: 9, stamina: 10 }, winTarget: 412, loseTarget: 564, boss: true },
  },
  407: {
    text: 'Tu profites d\'un instant d\'inattention pour verser le poison dans la coupe rituelle posée près de l\'autel. Elle en boit une gorgée sans même y penser, par pur automatisme de rituel — et son visage se convulse aussitôt sous l\'effet du poison.',
    combat: { enemy: { name: 'La Comtesse Vaudragne, empoisonnée', icon: '👑', skill: 5, stamina: 7 }, winTarget: 413, loseTarget: 565, boss: true },
  },
  410: {
    text: 'La Comtesse s\'effondre enfin, un siècle de survie volée s\'évaporant d\'elle en un instant comme une bougie soufflée. Tu te précipites vers l\'autel pour libérer Élyne, encore inconsciente mais vivante.',
    choices: [{ label: 'La détacher et réfléchir à la suite', targetId: 420 }],
  },
  411: {
    text: 'Le fer sacré a fait son œuvre : la Comtesse ne se relève pas. Tu trouves Élyne sur l\'autel, tremblante mais consciente, et l\'aides à se redresser tandis que le cercle de runes s\'éteint autour de vous.',
    choices: [{ label: 'L\'aider à se relever et réfléchir à la suite', targetId: 420 }],
  },
  412: {
    text: 'La Comtesse s\'effondre dans un dernier cri qui n\'a plus rien d\'humain, le rite raté ayant laissé sa marque sur elle autant que sur la pièce entière, dont les murs se fissurent lentement. Élyne, sur l\'autel, commence à reprendre connaissance.',
    choices: [{ label: 'La libérer et réfléchir à la suite', targetId: 420 }],
  },
  413: {
    text: 'Le poison achève ce que le rituel avait commencé à défaire : la Comtesse s\'écroule, son corps se desséchant en quelques secondes comme si un siècle entier la rattrapait d\'un coup. Tu libères Élyne, encore hébétée mais indemne.',
    choices: [{ label: 'L\'aider à se relever et réfléchir à la suite', targetId: 420 }],
  },
  425: {
    text: 'Le rite inversé trouve sa cible avec une précision presque douce. La Comtesse ne s\'effondre pas — elle se dissout, son visage perdant peu à peu sa dureté centenaire pour retrouver, l\'espace d\'un instant, une expression presque humaine, presque reconnaissante. « Merci, » murmure-t-elle, avant de ne plus être qu\'un peu de poussière emportée par le vent nocturne. Le cercle de runes s\'éteint sans violence. Élyne, libérée du même coup, ouvre lentement les yeux.',
    choices: [{ label: 'L\'aider à se relever', targetId: 426 }],
  },
  426: {
    text: 'Vous quittez la tour ensemble, sans qu\'un seul garde ne songe à vous barrer la route — comme si tout le château, délivré en même temps que sa maîtresse, retenait enfin son souffle.',
    choices: [{ label: 'Rentrer au village', targetId: 463 }],
  },
  420: {
    text: 'Le cercle de runes brisé continue de grésiller faiblement, et tu sens que la malédiction qui a lié ce lieu pendant un siècle n\'est peut-être pas entièrement rompue. Rester pour la briser à sa source serait risqué — mais partir sans le faire pourrait ne faire que reporter le problème à quelqu\'un d\'autre.',
    choices: [
      { label: 'Rester pour briser la malédiction à sa source', targetId: 421 },
      { label: 'Fuir immédiatement avec Élyne, tant qu\'il en est encore temps', targetId: 430 },
    ],
  },
  421: {
    text: 'Tu poses les mains sur les runes encore chaudes et pousses de toutes tes forces restantes, espérant que ça suffira à sceller ce que la Comtesse a ouvert il y a un siècle.',
    luckTest: { successTarget: 431, failTarget: 432 },
  },
  430: {
    text: 'Vous descendez la tour aussi vite que l\'état d\'Élyne le permet, laissant derrière vous un château qui semble déjà se refermer sur son propre silence, comme s\'il avait toujours su que ce jour viendrait.',
    choices: [{ label: 'Rentrer au village', targetId: 460 }],
  },
  431: {
    text: 'Les runes se referment dans un dernier éclat de lumière rousse, et un silence neuf, presque paisible, envahit la tour. Tu descends avec Élyne, certain cette fois que Château Vaudragne ne réclamera plus personne d\'autre.',
    choices: [{ label: 'Rentrer au village', targetId: 461 }],
  },
  432: {
    text: 'Le sceau ne prend qu\'à moitié, les runes grondant encore sourdement sous la pierre. Vous quittez la tour en hâte, épuisés, sans savoir vraiment ce que vous laissez derrière vous se réveiller un jour.',
    choices: [{ label: 'Rentrer au village, sur les nerfs', targetId: 462 }],
  },
  440: {
    text: 'Tu recules, referme doucement la porte, et redescends la tour aussi vite que la prudence le permet. Derrière toi, le chant reprend, indifférent à ta décision.',
    choices: [{ label: 'Quitter le château', targetId: 464 }],
  },

  // ================= FINS (460-464 non-mortelles) =================
  460: {
    text: 'FIN — LA CAPTIVE LIBÉRÉE\n\nJoran pleure en retrouvant sa sœur, et tu repars avec ta bourse, ta vie, et le souvenir d\'un château que tu espères ne jamais revoir. La malédiction, quelque part sous la lande, gronde peut-être encore — mais ce soir, Élyne est vivante, et c\'est déjà beaucoup.',
    title: 'La Captive Libérée',
    ending: 'victory',
  },
  461: {
    text: 'FIN — LA MALÉDICTION BRISÉE\n\nÉlyne rentre chez elle vivante, et Château Vaudragne, pour la première fois depuis un siècle, cesse de gronder sous la lande. Tu ne sauras jamais si on te croira, quand tu raconteras avoir mis fin à une malédiction centenaire — mais toi, tu sais.',
    title: 'La Malédiction Brisée',
    ending: 'victory',
  },
  462: {
    text: 'FIN — UNE VICTOIRE INACHEVÉE\n\nÉlyne est sauve, et c\'est là l\'essentiel. Mais quelque chose, sous la tour de Château Vaudragne, n\'a pas fini de gronder — et tu sais, sans pouvoir te l\'expliquer, que ce n\'est probablement pas terminé.',
    title: 'Une Victoire Inachevée',
    ending: 'partial',
  },
  463: {
    text: 'FIN — LE RITE SANS EFFUSION\n\nÉlyne rentre chez elle sans une égratignure, et la Comtesse Vaudragne, pour la première fois depuis un siècle, repose enfin en paix plutôt qu\'en tyrannie. Aucune lame n\'a été nécessaire — seulement les mots justes, au bon moment. On ne te croira sans doute jamais tout à fait, mais Joran, lui, n\'a pas besoin qu\'on le convainque.',
    title: 'Le Rite Sans Effusion',
    ending: 'victory',
  },
  464: {
    text: 'FIN — LA RETRAITE\n\nTu redescends de la colline les mains vides, Joran t\'attendant en bas avec une question dans les yeux que tu n\'as pas le courage d\'affronter. Élyne reste au château. La lune rousse, elle, continue de se lever, indifférente à ton choix.',
    title: 'La Retraite',
    ending: 'flee',
  },

  // ================= FINS DE MORT (551-590) =================
  551: {
    text: 'FIN — LES GARDES DU MUR\n\nLes lames des gardes trouvent leur cible avant que tu n\'aies pu franchir la brèche plus avant. Tu t\'effondres contre le mur d\'enceinte, à quelques pas seulement de l\'intérieur du château que tu ne verras jamais.',
    title: 'Les Gardes du Mur',
    ending: 'death',
  },
  552: {
    text: 'FIN — LA SENTINELLE DE L\'ARMURERIE\n\nLa sentinelle, mieux entraînée que tu ne l\'espérais, te cloue au sol du corps de garde. L\'épée bénie que tu venais de trouver reste sur le râtelier, inutile, à attendre un autre visiteur.',
    title: 'La Sentinelle de l\'Armurerie',
    ending: 'death',
  },
  556: {
    text: 'FIN — LE GARDE IVRE\n\nMalgré son ivresse, ou peut-être à cause d\'elle, le garde frappe avec une rage désordonnée qui finit, contre toute attente, par avoir raison de toi dans l\'obscurité des celliers.',
    title: 'Le Garde Ivre',
    ending: 'death',
  },
  557: {
    text: 'FIN — LA CORDE ROMPUE\n\nLa corde pourrie cède d\'un coup sous ton poids, et le puits désaffecté t\'engloutit dans une chute que rien, tout au fond, ne vient adoucir.',
    title: 'La Corde Rompue',
    ending: 'death',
  },
  558: {
    text: 'FIN — LA SENTINELLE DES CACHOTS\n\nLa hallebarde de la sentinelle animée s\'abat avec une force que son armure rouillée n\'aurait jamais dû pouvoir conserver. Tu t\'effondres dans les cachots, non loin de la cellule vide que tu cherchais à atteindre.',
    title: 'La Sentinelle des Cachots',
    ending: 'death',
  },
  560: {
    text: 'FIN — LE GARDE DU CORPS\n\nLe garde du corps du sénéchal ne te laisse aucune chance de plaider ta cause davantage. Tu t\'effondres dans la bibliothèque poussiéreuse, entre deux étagères que personne ne consultera plus jamais pour toi.',
    title: 'Le Garde du Corps',
    ending: 'death',
  },
  561: {
    text: 'FIN — LE CHEVALIER REVENANT\n\nLe chevalier noir abat un dernier coup d\'une force que la mort n\'aurait jamais dû lui laisser conserver. Tu t\'effondres au pied de l\'escalier de la tour, si près du but.',
    title: 'Le Chevalier Revenant',
    ending: 'death',
  },
  562: {
    text: 'FIN — LA COMTESSE VAUDRAGNE\n\nLa Comtesse referme une main glaciale sur ta gorge et te regarde t\'effondrer avec une curiosité presque tendre, comme on regarde s\'éteindre une bougie de plus parmi tant d\'autres. Le rituel, derrière elle, reprend son cours.',
    title: 'La Comtesse Vaudragne',
    ending: 'death',
  },
  563: {
    text: 'FIN — LE FER REBROUSSÉ\n\nMême blessée, la Comtesse trouve la force de te faire payer ton acharnement. L\'épée bénie t\'échappe des mains et glisse loin sur les dalles, inutile désormais.',
    title: 'Le Fer Rebroussé',
    ending: 'death',
  },
  564: {
    text: 'FIN — LA FUREUR DU RITE\n\nLa fureur du rite mal maîtrisé rend la Comtesse plus dangereuse encore qu\'à l\'accoutumée, et tu payes cher ton pari raté. Le cercle de runes se referme sur ton dernier souffle.',
    title: 'La Fureur du Rite',
    ending: 'death',
  },
  565: {
    text: 'FIN — LA COUPE RENVERSÉE\n\nLe poison affaiblit la Comtesse, mais pas assez vite : elle te renverse avant de s\'effondrer à son tour, quelques instants trop tard pour te sauver.',
    title: 'La Coupe Renversée',
    ending: 'death',
  },
  590: {
    text: 'FIN — LES OMBRES DU CHÂTEAU T\'EMPORTENT\n\nTes forces t\'abandonnent enfin, épuisées par une nuit qui ne t\'a laissé aucun répit. Château Vaudragne referme ses ombres sur toi, et plus personne ne te reverra jamais en ressortir.',
    title: 'Les Ombres du Château t\'Emportent',
    ending: 'death',
  },
};
