export const PARAGRAPHS = {
  1: {
    text: 'On raconte, dans les tavernes des basses terres, que les Cryptes Oubliées n\'ont jamais fini d\'engloutir ce qu\'on leur confie — hommes, richesses, serments.\n\nToi, tu y descends pour une clé. La Clé des Cryptes, forgée il y a des siècles pour sceller la faille qui s\'ouvre sous la nécropole, a été dérobée voilà trois nuits par un culte fanatique au service du Sorcier Déchu, cet ancien gardien des lieux que le pouvoir a fini par corrompre puis par tuer, sans jamais vraiment l\'achever.\n\nDepuis, les rumeurs se multiplient : bétail exsangue retrouvé aux abords des collines, lueurs verdâtres aperçues la nuit entre les pierres tombales, silence inhabituel des corbeaux qui, d\'ordinaire, ne quittent jamais ce cimetière à ciel ouvert. On t\'a payé cher pour redescendre là où d\'autres ne sont pas remontés, récupérer la Clé avant que la faille ne s\'élargisse pour de bon, et refermer derrière toi ce que le culte s\'apprête à rouvrir.\n\nTu n\'as ni carte, ni renfort, ni garantie de retour — seulement ton équipement, ton sang-froid, et le souvenir du dernier messager envoyé ici, jamais revenu. L\'entrée des cryptes s\'ouvre devant toi comme une bouche de pierre : un escalier usé plonge dans le noir, exhalant un souffle froid qui sent la terre remuée et les cierges éteints depuis longtemps. Au loin, très loin sous tes pieds, tu crois entendre — ou imaginer — un chant sourd et régulier, comme une respiration.',
    choices: [{ label: 'Pénétrer dans les cryptes', targetId: 2 }],
  },
  2: {
    text: 'L\'escalier débouche sur un hall d\'entrée voûté, où l\'écho de tes propres pas te revient déformé, dédoublé, comme si quelqu\'un d\'autre marchait juste derrière toi. Le hall se divise en trois. À gauche, un couloir exhale un air glacé et disparaît dans une obscurité si totale qu\'aucune lueur ne semble pouvoir y survivre. À droite, une pâle lumière bleutée danse sur la pierre humide, reflet d\'une source d\'eau souterraine que tu ne vois pas encore. Et au fond de la salle, presque invisible derrière un pan de mur effondré, une fissure étroite s\'enfonce à la verticale dans la roche — un passage que personne, visiblement, n\'a songé à emprunter.',
    choices: [
      { label: 'Le passage de gauche, d\'où souffle un air froid', targetId: 3 },
      { label: 'Le passage de droite, éclairé d\'une lueur bleutée', targetId: 8 },
      { label: 'Se glisser dans la fissure verticale du fond de la salle', targetId: 200 },
    ],
  },
  3: {
    text: 'Le couloir de gauche resserre ses murs suintants d\'humidité, l\'air y devenant si froid que ta respiration se met à fumer. Une petite alcôve, creusée à même la roche, s\'ouvre sur ta gauche : une torche à demi consumée y est encore fichée dans un support de fer rongé par la rouille, comme abandonnée en hâte par un visiteur qui n\'a jamais eu l\'occasion de revenir la chercher. Plus loin, le couloir continue de descendre, et une autre ouverture, plus discrète, semble s\'enfoncer sur le côté — une galerie annexe que la torche, justement, ne suffit pas à éclairer entièrement.',
    choices: [
      { label: 'Prendre la torche et poursuivre', targetId: 4, grantItem: 'torche' },
      { label: 'Poursuivre sans t\'attarder', targetId: 4 },
      { label: 'Explorer discrètement la galerie annexe plutôt que de continuer tout droit', targetId: 220 },
    ],
  },
  4: {
    text: 'Le couloir plonge en pente raide, la pierre devenant glissante sous tes pieds, avant de s\'achever brutalement sur un gouffre étroit — à peine plus large qu\'une enjambée forcée, mais dont le fond se perd dans un noir que même ta torche, si tu en portes une, ne parvient pas à percer. Un courant d\'air froid en remonte, chargé d\'une odeur minérale et ancienne. Il n\'y a pas d\'autre chemin visible : tu dois sauter.',
    luckTest: { successTarget: 6, failTarget: 5 },
  },
  5: {
    text: 'Ton pied dérape sur le rebord humide au moment du saut. L\'espace d\'un instant qui te semble durer bien trop longtemps, tu bascules — puis tes mains trouvent une aspérité de pierre et s\'y agrippent de toutes leurs forces. Tu restes suspendu, le cœur battant à tout rompre, les paumes écorchées, avant de parvenir à te hisser de l\'autre côté.',
    choices: [{ label: 'Te relever et poursuivre, endolori', targetId: 6, effect: { stat: 'stamina', amount: -2 } }],
  },
  6: {
    text: 'De l\'autre côté du gouffre s\'étend une salle basse jonchée d\'ossements jaunis et de fragments d\'armures rouillées, éclairés par endroits de braseros à moitié éteints. Deux acolytes du culte, le visage dissimulé sous des capuches sombres, des dagues rituelles à la main, se dressent en te voyant approcher — visiblement postés là pour empêcher quiconque de progresser plus avant.',
    combat: { enemy: { name: 'Acolytes du culte', icon: '🗡️', skill: 8, stamina: 8 }, winTarget: 7, loseTarget: 72 },
  },
  7: {
    text: 'Le combat terminé, tu reprends ton souffle contre un mur de pierre froide, le silence de la salle d\'ossements bientôt rompu par un nouveau bruit, lointain : quelque chose gronde, très loin devant toi, quelque part au cœur des cryptes.',
    choices: [{ label: 'Poursuivre', targetId: 12 }],
  },
  8: {
    text: 'Le couloir de droite longe un ruisseau souterrain dont la surface, parfaitement immobile, renvoie une pâle lueur bleutée dont tu ne trouves pas la source. Le bruit de l\'eau est presque absent, comme si le courant lui-même retenait son souffle. Plus loin, un escalier taillé grossièrement dans la roche brute s\'enfonce en colimaçon vers les profondeurs, tandis qu\'une petite alcôve s\'ouvre en suivant le ruisseau vers l\'amont.',
    choices: [
      { label: 'Suivre le ruisseau vers une petite alcôve', targetId: 9 },
      { label: 'Emprunter directement l\'escalier taillé', targetId: 111 },
    ],
  },
  9: {
    text: 'Le ruisseau te conduit à une alcôve étroite où repose, posée sur un socle de pierre couvert de mousse, une fiole scellée de cire noircie. Son contenu, d\'un rouge sombre et familier, semble avoir traversé les siècles sans se corrompre.',
    choices: [{ label: 'Prendre la fiole et poursuivre', targetId: 10, grantItem: 'potion_soin' }],
  },
  10: {
    text: 'Tu rebrousses chemin le long du ruisseau silencieux jusqu\'à l\'escalier taillé, dont les marches irrégulières s\'enfoncent en spirale dans une obscurité de plus en plus dense.',
    choices: [{ label: 'Descendre l\'escalier', targetId: 111 }],
  },
  111: {
    text: 'L\'escalier débouche sur une salle basse entièrement inondée, l\'eau noire et immobile te montant jusqu\'aux genoux. Une odeur de vase et de pierre mouillée emplit l\'air. Au loin, une corniche étroite longe le mur du fond, juste au-dessus du niveau de l\'eau — plus sûre, sans doute, mais plus lente.',
    choices: [
      { label: 'Traverser à la nage, malgré le courant froid', targetId: 112 },
      { label: 'Longer la corniche étroite au-dessus de l\'eau', targetId: 113 },
    ],
  },
  112: {
    text: 'Tu t\'enfonces dans l\'eau glaciale et nages droit devant toi, les jambes déjà engourdies. Un courant invisible, plus fort que prévu, tire soudain sur tes membres.',
    luckTest: { successTarget: 11, failTarget: 114 },
  },
  113: {
    text: 'Tu progresses avec prudence sur la corniche étroite, le dos collé à la paroi humide, un pied après l\'autre, jusqu\'à rejoindre la roche sèche de l\'autre côté sans le moindre incident.',
    choices: [{ label: 'Poursuivre vers l\'escalier de pierre', targetId: 11 }],
  },
  114: {
    text: 'Le courant t\'entraîne malgré toi contre un pan de mur immergé, où tu te cognes durement avant de réussir à reprendre pied, essoufflé et transi de froid.',
    choices: [{ label: 'Te hisser hors de l\'eau, épuisé', targetId: 11, effect: { stat: 'stamina', amount: -2 } }],
  },
  11: {
    text: 'Au pied de l\'escalier de pierre, une silhouette qui semblait n\'être qu\'un tas d\'armure rouillée abandonné se redresse soudain dans un grincement d\'os et de métal : un squelette en armure, l\'épée ébréchée déjà levée, se plante au milieu du passage pour t\'en interdire l\'accès.',
    combat: { enemy: { name: 'Squelette gardien', icon: '💀', skill: 7, stamina: 6 }, winTarget: 7, loseTarget: 73 },
  },
  12: {
    text: 'Les deux chemins se rejoignent dans une vaste salle centrale, dont le plafond se perd si haut dans l\'obscurité que même l\'écho semble y renoncer. Au fond, un autel de pierre pâle se dresse, étrangement dépourvu de toute inscription menaçante — il dégage même, contre toute attente en ces lieux, une forme de sérénité tranquille, presque un répit.',
    choices: [
      { label: 'Se recueillir un instant à l\'autel', targetId: 13 },
      { label: 'T\'accorder un instant de répit contre le mur froid', targetId: 60 },
      { label: 'Ignorer l\'autel et poursuivre', targetId: 15 },
    ],
  },
  13: {
    text: 'Tu poses la main sur la pierre froide et lisse de l\'autel, sans trop savoir ce que tu en attends — un geste presque instinctif, comme on se signe devant une chose qu\'on ne comprend pas tout à fait.',
    luckTest: { successTarget: 14, failTarget: 15 },
  },
  14: {
    text: 'Une lumière tiède, sans source apparente, enveloppe un instant tes mains posées sur la pierre. Quand elle s\'efface, une petite amulette — invisible l\'instant d\'avant — repose sur l\'autel devant toi, comme si les lieux eux-mêmes avaient choisi de te la confier.',
    choices: [{ label: 'Prendre l\'amulette et poursuivre', targetId: 15, grantItem: 'amulette_lumiere' }],
  },
  15: {
    text: 'Au-delà de la salle centrale, un long corridor de pierre taillée se divise à nouveau. Sur ta gauche, une galerie latérale scintille faiblement, d\'un éclat presque doré qui tranche avec le reste des cryptes. Droit devant, le couloir principal continue, plus sombre, plus silencieux, se refermant peu à peu sur lui-même.',
    choices: [
      { label: 'Explorer la galerie latérale scintillante', targetId: 16 },
      { label: 'Poursuivre le couloir principal', targetId: 19 },
    ],
  },
  16: {
    text: 'L\'éclat de la galerie vient de fils métalliques tendus en travers du passage à hauteur de cheville, presque invisibles dans la pénombre et vibrant faiblement au moindre courant d\'air — un piège ancien, mais toujours actif, de toute évidence.',
    choices: [
      { label: 'Avancer prudemment, torche en main, en repérant les fils', targetId: 17, requiresItem: 'torche' },
      { label: 'Avancer à tâtons dans l\'obscurité', targetId: 162 },
    ],
  },
  162: {
    text: 'Sans lumière pour repérer les fils tendus dans le noir, tu avances au jugé, un pas hésitant après l\'autre, l\'oreille tendue vers le moindre cliquetis suspect.',
    luckTest: { successTarget: 17, failTarget: 18 },
  },
  17: {
    text: 'Tu évites chaque fil avec un soin méticuleux, le souffle court. Au bout de la galerie, quelques pièces ternies et sans valeur gisent éparpillées dans la poussière — rien qui vaille la peine de s\'attarder davantage dans un endroit aussi manifestement piégé.',
    choices: [{ label: 'Rebrousser chemin vers le couloir principal', targetId: 19 }],
  },
  18: {
    text: 'Un fil cède sous ton pied dans un cliquetis sec. Un mécanisme claque quelque part dans l\'obscurité, et une volée de pierres acérées jaillit d\'une fissure du mur, te lacérant profondément avant que tu n\'aies eu le temps de réagir.',
    choices: [{ label: 'Te dégager, blessé, et rejoindre le couloir principal', targetId: 19, effect: { stat: 'stamina', amount: -8 }, deathTarget: 79 }],
  },
  19: {
    text: 'Une statue de chevalier en armure noire se dresse au milieu du couloir principal, figée dans une posture de garde, ses orbites de pierre vide braquées droit devant elle. Tu n\'as pas fait trois pas de plus qu\'elle se met en mouvement dans un grincement de métal ancien, articulations grinçant comme si des siècles d\'immobilité venaient soudain de se rompre.',
    combat: { enemy: { name: 'Chevalier noir pétrifié', icon: '🛡️', skill: 9, stamina: 8 }, winTarget: 20, loseTarget: 74 },
  },
  20: {
    text: 'Passé la statue vaincue, une porte de pierre massive te barre le passage, close sans la moindre poignée ni serrure visible. Une inscription à demi effacée court le long de son cadre, où un unique mot semble manquer, comme arraché — la porte attend, de toute évidence, qu\'on prononce un nom.',
    choices: [
      { label: 'Prononcer le nom du Sorcier Déchu', targetId: 21 },
      { label: 'Prononcer le nom du Gardien Déchu', targetId: 22 },
      { label: 'Rester silencieux et pousser la porte de toutes tes forces', targetId: 23 },
    ],
  },
  21: {
    text: 'Le nom résonne à peine prononcé qu\'une décharge glacée remonte le long de ton bras — mauvaise réponse, visiblement, et la pierre te le fait savoir sans détour. La porte s\'ouvre malgré tout, dans un grincement presque irrité, comme si les cryptes elles-mêmes te laissaient passer à contrecœur.',
    choices: [{ label: 'Franchir la porte, la peau brûlante', targetId: 24, effect: { stat: 'stamina', amount: -2 } }],
  },
  22: {
    text: 'Le nom semble apaiser la pierre elle-même, presque soulagée qu\'on s\'en souvienne encore. La porte glisse alors sans la moindre résistance, silencieuse, comme huilée par des mains invisibles.',
    choices: [{ label: 'Franchir la porte', targetId: 24 }],
  },
  23: {
    text: 'À force d\'épaule et malgré la fatigue qui commence à peser sur tes membres, la porte finit par céder dans un grondement sourd, sans qu\'aucun mot n\'ait été nécessaire — la force brute a, cette fois, suffi là où les mots hésitaient.',
    choices: [{ label: 'Franchir la porte enfin ouverte', targetId: 24 }],
  },
  24: {
    text: 'De l\'autre côté s\'étend une passerelle de pierre étroite, jetée en équilibre précaire au-dessus d\'un gouffre dont ta torche, si tu en portes une, ne parvient même pas à effleurer le fond. Certaines dalles semblent descellées, prêtes à basculer au moindre faux pas.',
    choices: [
      { label: 'Traverser rapidement, quitte à courir le risque', targetId: 25 },
      { label: 'Traverser avec une lenteur prudente', targetId: 26 },
      { label: 'Repérer les dalles fissurées à la lumière de la torche avant d\'avancer', targetId: 210, requiresItem: 'torche' },
    ],
  },
  25: {
    text: 'Tu t\'élances sur la passerelle sans ralentir, pressé d\'en finir avec ce vide qui t\'aspire presque du regard. Une dalle bascule brusquement sous ton poids.',
    luckTest: { successTarget: 27, failTarget: 71, failEffect: { stat: 'stamina', amount: -9999 }, deathTarget: 71 },
  },
  26: {
    text: 'Tu avances pas à pas, testant chaque dalle du bout du pied avant d\'y poser ton poids entier. La traversée est longue, éprouvante pour les nerfs, mais elle te mène de l\'autre côté sain et sauf.',
    choices: [{ label: 'Achever la traversée, épuisé', targetId: 27, effect: { stat: 'stamina', amount: -1 } }],
  },
  210: {
    text: 'À la lueur mouvante de la torche, les fissures qui lézardent certaines dalles deviennent soudain visibles — de fines lignes sombres, presque invisibles à l\'œil nu dans le noir complet. Tu progresses sans hésiter, évitant chaque piège avec une aisance que le hasard seul n\'aurait pas pu t\'offrir.',
    choices: [{ label: 'Achever la traversée sans encombre', targetId: 27 }],
  },
  27: {
    text: 'Une bibliothèque à demi engloutie s\'étend de l\'autre côté, ses rayonnages de pierre couverts d\'une mousse pâle et luminescente. Des ouvrages illisibles, gonflés d\'humidité et rongés par le temps, s\'entassent encore sur certaines étagères, comme si quelqu\'un, autrefois, avait tenté de sauver ce qui pouvait l\'être. Au fond de la salle, à demi masqué par un rideau de toiles d\'araignée, pend un grand miroir fissuré, son cadre noirci couvert de symboles que tu ne reconnais pas.',
    choices: [
      { label: 'Fouiller les rayonnages immergés', targetId: 28 },
      { label: 'Examiner le grand miroir fissuré', targetId: 280 },
      { label: 'Poursuivre sans t\'attarder', targetId: 29 },
    ],
  },
  28: {
    text: 'Sous un ouvrage éventré, à demi dissous par l\'humidité, tu découvres une dague d\'argent soigneusement enveloppée dans un linge resté étrangement sec malgré des siècles d\'eau stagnante — une lame réputée, dans les vieux récits que l\'on racontait encore avant que ces cryptes ne soient oubliées, mortelle pour ce que la mort a renoncé à finir.',
    choices: [{ label: 'Prendre la dague et poursuivre', targetId: 29, grantItem: 'dague_argent' }],
  },
  280: {
    text: 'Tu t\'approches du miroir fissuré. Ton reflet, dans la pénombre, semble mettre un instant de trop à te suivre — un détail infime, presque rien, mais qui te glace davantage que le froid des cryptes.',
    luckTest: { successTarget: 281, failTarget: 282 },
  },
  281: {
    text: 'Tu détournes le regard juste à temps. L\'espace d\'un battement de cœur, la surface du miroir se brouille et te montre, en un éclair, le tracé d\'un passage que tu n\'avais pas remarqué — une bribe de clairvoyance, aussitôt évanouie, mais dont l\'écho te rend plus vif qu\'avant.',
    choices: [{ label: 'Poursuivre, l\'esprit étrangement affûté', targetId: 29, effect: { stat: 'luck', amount: 1 } }],
  },
  282: {
    text: 'Ton reflet, dans le miroir, cesse soudain d\'imiter tes gestes. Il tend une main décharnée vers la surface du verre — puis en jaillit, spectre blafard aux orbites vides, avec un cri qui n\'a rien d\'humain.',
    combat: { enemy: { name: 'Spectre du miroir', icon: '🪞', skill: 7, stamina: 6 }, winTarget: 283, loseTarget: 80 },
  },
  283: {
    text: 'Le spectre se dissout dans un dernier hurlement silencieux, aspiré à rebours dans le verre fissuré qui, l\'instant d\'après, ne réfléchit plus rien du tout. Tu t\'écartes, les mains tremblantes, et rejoins sans te retourner le reste de la bibliothèque engloutie.',
    choices: [{ label: 'Poursuivre, ébranlé mais entier', targetId: 29 }],
  },
  29: {
    text: 'Un dernier couloir descend en pente douce vers une lumière rougeâtre et vacillante, projetant des ombres mouvantes sur les murs. Un chant rituel, sourd et parfaitement régulier, monte peu à peu de la salle qui s\'annonce, ponctué par endroits d\'un cliquetis métallique — des chaînes, peut-être, ou des armes.',
    choices: [{ label: 'Approcher de la salle du culte', targetId: 30 }],
  },
  30: {
    text: 'Depuis l\'ombre d\'un pilier fissuré, tu observes enfin la salle du culte : des silhouettes encapuchonnées forment un cercle autour du Sorcier Déchu, qui tient la Clé des Cryptes à bout de bras au-dessus d\'un vaste cercle de runes déjà actif, palpitant d\'une lueur verdâtre malsaine. Le chant s\'intensifie, comme si le rituel touchait à son terme.',
    choices: [
      { label: 'Foncer immédiatement dans la salle', targetId: 31 },
      { label: 'Observer discrètement la scène avant d\'agir', targetId: 32 },
      { label: 'Rebrousser chemin — la quête est trop périlleuse', targetId: 550 },
    ],
  },
  31: {
    text: 'Tu surgis dans la salle sans attendre, profitant de la surprise. Deux cultistes se détachent aussitôt du cercle pour t\'intercepter, leurs lames rituelles déjà levées, le chant interrompu net par des cris d\'alarme.',
    combat: { enemy: { name: 'Cultistes du Sorcier Déchu', icon: '🕯️', skill: 7, stamina: 7 }, winTarget: 33, loseTarget: 75 },
  },
  32: {
    text: 'Tu prends un instant pour étudier le déroulement du rituel avant de t\'engager, cherchant dans les gestes des cultistes et le tracé des runes une faiblesse à exploiter.',
    luckTest: {
      successTarget: 33,
      failTarget: 33,
      successEffect: { stat: 'stamina', amount: 1 },
      failEffect: { stat: 'stamina', amount: -1 },
    },
  },
  33: {
    text: 'Le Sorcier Déchu se tourne enfin vers toi, la Clé des Cryptes toujours serrée dans son poing décharné, un sourire sans joie flottant sur ce qui reste de son visage. « Encore un qui croit pouvoir descendre plus loin que les autres... » Sa voix résonne comme si elle sortait de plusieurs gorges à la fois.',
    choices: [
      { label: 'Attaquer le Sorcier Déchu de front', targetId: 34 },
      { label: 'Frapper avec la dague d\'argent, droit au cœur', targetId: 40, requiresItem: 'dague_argent' },
      { label: 'Brandir l\'amulette bénie face à lui', targetId: 42, requiresItem: 'amulette_lumiere' },
      { label: 'Faire résonner la clochette d\'argent au cœur du rituel', targetId: 46, requiresItem: 'clochette_argent' },
    ],
  },
  34: {
    text: 'Tu charges sans détour, l\'arme haute. Le combat s\'engage aussitôt, brutal et chaotique, dans le vacarme du rituel interrompu et les éclats verdâtres du cercle de runes qui vacille sous les coups.',
    combat: { enemy: { name: 'Le Sorcier Déchu', icon: '🧙', skill: 10, stamina: 12 }, winTarget: 36, loseTarget: 76 },
  },
  36: {
    text: 'Le Sorcier Déchu s\'effondre enfin, vaincu, et le cercle de runes perd d\'un coup son éclat malsain. La Clé des Cryptes roule sur la pierre froide dans un tintement métallique ; tu la ramasses, encore tiède d\'un pouvoir qui s\'éteint lentement entre tes doigts.',
    choices: [
      { label: 'Partir immédiatement avec la Clé', targetId: 500, grantItem: 'clef_cryptes' },
      { label: 'Rester pour sceller la faille définitivement', targetId: 38, grantItem: 'clef_cryptes' },
    ],
  },
  38: {
    text: 'Le cercle de runes, encore actif malgré la chute du Sorcier, palpite faiblement sous tes pieds, comme un cœur qui refuse de s\'arrêter tout à fait. Refermer la faille pour de bon demanderait d\'y verser ce qu\'il te reste de force.',
    luckTest: { successTarget: 520, failTarget: 530 },
  },
  40: {
    text: 'Tu te glisses entre les cultistes distraits par le chant et frappes avec la dague d\'argent. La lame trouve, sans effort apparent, une faille que nulle armure ni nulle magie ne protégeait — le Sorcier Déchu se fige, incrédule, comme surpris que la mort ose encore le réclamer.',
    choices: [{ label: 'Achever le rituel interrompu et récupérer la Clé', targetId: 41 }],
  },
  41: {
    text: 'Le Sorcier Déchu s\'effondre sans un mot, la dague d\'argent plantée là où battait jadis son cœur. Autour de toi, le cercle de runes vacille et s\'éteint peu à peu. Tu récupères la Clé des Cryptes, encore tiède contre ta paume.',
    choices: [
      { label: 'Partir immédiatement avec la Clé', targetId: 500, grantItem: 'clef_cryptes' },
      { label: 'Rester pour sceller la faille définitivement', targetId: 38, grantItem: 'clef_cryptes' },
    ],
  },
  42: {
    text: 'Tu brandis l\'amulette bénie devant toi. Sa lumière froide balaie la salle d\'un seul coup, chassant les ombres jusque dans leurs derniers recoins — le Sorcier Déchu recule en sifflant de douleur, lâchant la Clé des Cryptes qui tinte sur la pierre, avant de disparaître dans un couloir latéral, drapé d\'une brume noire.',
    choices: [
      { label: 'Poursuivre le Sorcier en fuite', targetId: 44, grantItem: 'clef_cryptes' },
      { label: 'Le laisser fuir et repartir avec la Clé', targetId: 500, grantItem: 'clef_cryptes' },
    ],
  },
  44: {
    text: 'Tu t\'élances dans le couloir sombre à la poursuite du Sorcier Déchu, dont la silhouette vacille encore, affaiblie par la lumière de l\'amulette qui semble avoir laissé une brûlure profonde dans ce qui lui reste de substance.',
    combat: { enemy: { name: 'Le Sorcier Déchu, affaibli', icon: '🧙', skill: 8, stamina: 6 }, winTarget: 520, loseTarget: 77 },
  },
  46: {
    text: 'Tu fais résonner la clochette d\'argent au beau milieu du rituel. Son tintement clair, presque anodin, traverse pourtant la salle comme une lame — les cultistes se bouchent les oreilles en hurlant, et le Sorcier Déchu lui-même vacille, sa concentration brisée net, sa forme entière parcourue d\'un tremblement douloureux. C\'est le moment ou jamais de frapper.',
    combat: { enemy: { name: 'Le Sorcier Déchu, désorienté', icon: '🧙', skill: 6, stamina: 6 }, winTarget: 47, loseTarget: 78 },
  },
  47: {
    text: 'Affaibli par le tintement qui semble encore résonner entre les pierres, le Sorcier Déchu s\'effondre sans avoir pu opposer la moindre résistance sérieuse. Le cercle de runes grésille, privé de celui qui l\'alimentait. Tu récupères la Clé des Cryptes, tombée à ses pieds.',
    choices: [
      { label: 'Partir immédiatement avec la Clé', targetId: 500, grantItem: 'clef_cryptes' },
      { label: 'Rester pour sceller la faille définitivement', targetId: 38, grantItem: 'clef_cryptes' },
    ],
  },
  500: {
    text: 'Tu empoches la Clé et tournes déjà les talons. Derrière toi, la salle du culte s\'effondre lentement sur elle-même, pierre après pierre, comme si les cryptes entières exhalaient un dernier soupir. Tu cours — passant devant l\'autel serein, devant le gouffre franchi à l\'aller, devant la salle d\'ossements où tout a commencé — jusqu\'à ce que l\'escalier d\'entrée t\'apparaisse enfin, et avec lui, une pâle lumière de surface que tu avais presque oubliée.',
    choices: [{ label: 'Remonter vers la lumière', targetId: 50 }],
  },
  520: {
    text: 'Le cercle de runes se referme dans un grondement qui semble monter des fondations mêmes des cryptes. La pierre tremble un instant sous tes pieds, puis tout redevient immobile — un silence si total qu\'il en devient presque assourdissant. Tu ramasses tes forces, et entames la longue remontée vers la surface, la Clé serrée contre toi.',
    choices: [{ label: 'Remonter vers la lumière', targetId: 52 }],
  },
  530: {
    text: 'Le rituel de scellement te vide de tes dernières forces sans jamais tout à fait aboutir. Tu t\'effondres sur la pierre froide, la Clé toujours serrée dans ton poing, tandis qu\'un grondement sourd, quelque part sous tes pieds, te rappelle que rien n\'est vraiment terminé. C\'est en rampant, presque, que tu retrouves le chemin de la surface.',
    choices: [{ label: 'Remonter vers la lumière, à bout de forces', targetId: 53 }],
  },
  550: {
    text: 'Tu tournes le dos à la salle du culte et remontes en silence, le pas rapide mais mesuré, retraversant les couloirs par lesquels tu es descendu — la salle d\'ossements, le gouffre, l\'autel serein — sans qu\'aucune ombre ne songe à te poursuivre. Derrière toi, le chant rituel continue, indifférent à ton départ.',
    choices: [{ label: 'Remonter vers la surface', targetId: 55 }],
  },
  50: {
    text: 'FIN — LA CLÉ RÉCUPÉRÉE\n\nTu ressors des Cryptes Oubliées, la Clé serrée contre toi, laissant derrière toi une faille encore instable mais désormais privée de sa clé d\'accès. Ce ne sera peut-être pas suffisant à long terme — mais aujourd\'hui, sous le ciel enfin retrouvé, ta mission est un succès.',
    title: 'La Clé Récupérée',
    ending: 'victory',
  },
  52: {
    text: 'FIN — LA FAILLE SCELLÉE\n\nTu ressors des cryptes avec la Clé, et derrière toi, pour la première fois depuis bien longtemps, les cryptes sont un peu moins vivantes. La faille est close, le culte décapité, et le ciel, au-dessus de toi, n\'a jamais semblé aussi vaste.',
    title: 'La Faille Scellée',
    ending: 'victory',
  },
  53: {
    text: 'FIN — UNE VICTOIRE AMÈRE\n\nTu es vivant, et la Clé est à toi — mais la faille, elle, gronde encore quelque part sous la pierre, patiente, attendant son heure. Une victoire, sans doute. Mais pas celle que tu étais venu chercher.',
    title: 'Une Victoire Amère',
    ending: 'partial',
  },
  55: {
    text: 'FIN — LA RETRAITE\n\nTu remontes vers la surface, les mains vides mais le corps intact. Personne ne pourra te reprocher d\'avoir voulu vivre. La Clé des Cryptes, elle, reste où tu l\'as laissée — et le Sorcier Déchu, lui, n\'a pas fini d\'en faire usage.',
    title: 'La Retraite',
    ending: 'flee',
  },
  60: {
    text: 'Tu t\'accordes un instant de répit, le dos contre la pierre froide de la salle centrale, laissant le silence des lieux t\'envelopper quelques minutes avant de reprendre des forces et de poursuivre.',
    choices: [{ label: 'Poursuivre, un peu revigoré', targetId: 15, effect: { stat: 'stamina', amount: 2 } }],
  },
  70: {
    text: 'FIN — LES TÉNÈBRES T\'EMPORTENT\n\nTes forces t\'abandonnent enfin, tes membres refusant de répondre plus longtemps. Tu t\'effondres dans l\'obscurité des cryptes, et plus personne ne te reverra jamais remonter à la surface.',
    title: 'Les Ténèbres t\'Emportent',
    ending: 'death',
  },
  71: {
    text: 'FIN — LA CHUTE\n\nLa dalle cède sous ton poids dans un craquement sec. Tu bascules dans le gouffre sans fond, et le silence qui suit ta chute est la dernière chose que tu entends.',
    title: 'La Chute',
    ending: 'death',
  },
  72: {
    text: 'FIN — LES ACOLYTES\n\nUne dague rituelle trouve enfin un passage entre tes gardes. Tu t\'effondres parmi les ossements de ceux qui t\'ont précédé ici, tandis que les deux acolytes reprennent, sans un mot, leur faction silencieuse au-dessus de ton corps.',
    title: 'Les Acolytes',
    ending: 'death',
  },
  73: {
    text: 'FIN — LE SQUELETTE GARDIEN\n\nL\'épée ébréchée du gardien trouve enfin sa cible. Tu t\'écroules au pied de l\'escalier taillé, et le squelette reprend sa faction immobile, comme s\'il n\'avait jamais bougé — comme s\'il t\'attendait déjà, toi et le prochain.',
    title: 'Le Squelette Gardien',
    ending: 'death',
  },
  74: {
    text: 'FIN — LE CHEVALIER NOIR\n\nLe chevalier pétrifié abat un dernier coup, d\'une force que la pierre n\'aurait jamais dû conserver. Tu t\'effondres devant la porte scellée, dont le nom manquant, désormais, n\'a plus d\'importance pour toi.',
    title: 'Le Chevalier Noir',
    ending: 'death',
  },
  75: {
    text: 'FIN — LES CULTISTES DU RITUEL\n\nLes lames rituelles des cultistes te submergent avant que tu n\'aies pu atteindre le Sorcier Déchu. Le chant reprend presque aussitôt, à peine interrompu, comme si ta chute n\'était qu\'un détail du rite déjà écrit.',
    title: 'Les Cultistes du Rituel',
    ending: 'death',
  },
  76: {
    text: 'FIN — LE SORCIER DÉCHU\n\nLe Sorcier Déchu referme sa main décharnée sur la Clé des Cryptes et te regarde t\'effondrer avec, sur ce qui lui reste de visage, quelque chose qui ressemble presque à de la pitié. Le rituel, autour de toi, reprend son chant comme si de rien n\'était.',
    title: 'Le Sorcier Déchu',
    ending: 'death',
  },
  77: {
    text: 'FIN — LA POURSUITE FATALE\n\nAffaibli mais loin d\'être vaincu, le Sorcier Déchu se retourne dans le couloir sombre et te fait payer cher ton acharnement. Tu t\'effondres loin de la salle du culte, dans un couloir que personne ne songera à explorer.',
    title: 'La Poursuite Fatale',
    ending: 'death',
  },
  78: {
    text: 'FIN — LE TINTEMENT ÉTOUFFÉ\n\nLe Sorcier Déchu, un instant désorienté par la clochette, retrouve son aplomb bien plus vite que tu ne l\'espérais. Le dernier son que tu entends n\'est plus un tintement d\'argent, mais un rire sans joie, venu de plusieurs gorges à la fois.',
    title: 'Le Tintement Étouffé',
    ending: 'death',
  },
  79: {
    text: 'FIN — LE PIÈGE DE PIERRE\n\nLes pierres acérées jaillies du mur t\'ont frappé plus profondément que tu ne le pensais. Tu t\'effondres dans la galerie scintillante, loin de tout secours, tandis que le mécanisme ancien, satisfait, retourne à son silence.',
    title: 'Le Piège de Pierre',
    ending: 'death',
  },
  80: {
    text: 'FIN — LE SPECTRE DU MIROIR\n\nLe spectre te submerge, glacial, et t\'entraîne avec lui dans la surface du verre fissuré. Un instant plus tard, la bibliothèque engloutie est de nouveau parfaitement silencieuse — et ton reflet, désormais seul dans le miroir, continue d\'y attendre le prochain visiteur.',
    title: 'Le Spectre du Miroir',
    ending: 'death',
  },
  200: {
    text: 'La fissure s\'élargit en un boyau vertical, à peine assez large pour y glisser les épaules. Tu te laisses descendre en t\'appuyant sur les aspérités de la roche, l\'obscurité se refermant au-dessus de toi comme une trappe. À mi-chemin, une prise cède sous ta main.',
    luckTest: { successTarget: 201, failTarget: 202 },
  },
  201: {
    text: 'Tu te rattrapes de justesse et achèves la descente sans autre encombre, atterrissant en souplesse au fond d\'une petite chapelle oubliée. Un autel miniature, couvert de poussière, porte encore une clochette d\'argent ternie par les siècles — le genre d\'objet que l\'on n\'abandonne pas sans raison.',
    choices: [
      { label: 'Prendre la clochette et poursuivre', targetId: 203, grantItem: 'clochette_argent' },
      { label: 'Laisser la clochette et poursuivre', targetId: 203 },
    ],
  },
  202: {
    text: 'Tu rates ta prise et termines la descente dans une chute mal maîtrisée, heurtant durement le sol de la chapelle oubliée. Trop sonné pour t\'attarder sur le petit autel poussiéreux qui s\'y trouve, tu te relèves tant bien que mal.',
    choices: [{ label: 'Te relever et poursuivre, endolori', targetId: 203, effect: { stat: 'stamina', amount: -2 } }],
  },
  203: {
    text: 'Un passage bas et étroit s\'ouvre au fond de la chapelle oubliée, débouchant après quelques mètres sur un souffle d\'air plus large, presque libérateur : la salle centrale des cryptes, que tu rejoins par un chemin que personne, visiblement, n\'emprunte plus depuis longtemps.',
    choices: [{ label: 'Rejoindre la salle centrale', targetId: 12 }],
  },
  220: {
    text: 'Tu t\'engages sans bruit dans la galerie annexe, loin de la torche et du couloir principal, avançant à l\'aveugle le long d\'un mur suintant, l\'oreille tendue vers le moindre écho suspect.',
    luckTest: { successTarget: 221, failTarget: 222 },
  },
  221: {
    text: 'La galerie serpente plus qu\'elle ne semblait le promettre, mais elle te mène, contre toute attente, directement à l\'abri de la salle centrale — tu as contourné sans le savoir aussi bien le gouffre que ses gardiens.',
    choices: [{ label: 'Rejoindre la salle centrale', targetId: 12 }],
  },
  222: {
    text: 'La galerie se referme en cul-de-sac sur un mur plein. Tu dois rebrousser chemin dans le noir, le temps perdu et les nerfs éprouvés, jusqu\'au couloir principal et à son gouffre qu\'il te faudra bien, finalement, affronter.',
    choices: [{ label: 'Revenir sur tes pas jusqu\'au gouffre', targetId: 4, effect: { stat: 'stamina', amount: -1 } }],
  },
};
