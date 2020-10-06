const met = [
  {
    activity: "bicycling",
    motion: "bicycling, mountain, uphill, vigorous",
    mets: "14.0",
  },
  {
    activity: "bicycling",
    motion: "bicycling, mountain, competitive, racing",
    mets: "16.0",
  },
  {
    activity: "bicycling",
    motion: "bicycling, BMX",
    mets: "8.5",
  },
  {
    activity: "bicycling",
    motion: "bicycling, mountain, general",
    mets: "8.5",
  },
  {
    activity: "bicycling",
    motion: "bicycling, <10 mph, leisure, to work or for pleasure",
    mets: "4.0",
  },
  {
    activity: "bicycling",
    motion: "bicycling, to/from work, self selected pace",
    mets: "6.8",
  },
  {
    activity: "bicycling",
    motion: "bicycling, on dirt or farm road, moderate pace",
    mets: "5.8",
  },
  {
    activity: "bicycling",
    motion: "bicycling, general",
    mets: "7.5",
  },
  {
    activity: "bicycling",
    motion: "bicycling, leisure, 5.5 mph",
    mets: "3.5",
  },
  {
    activity: "bicycling",
    motion: "bicycling, leisure, 9.4 mph",
    mets: "5.8",
  },
  {
    activity: "bicycling",
    motion: "bicycling, 10-11.9 mph, leisure, slow, light effort",
    mets: "6.8",
  },
  {
    activity: "bicycling",
    motion: "bicycling, 12-13.9 mph, leisure, moderate effort",
    mets: "8.0",
  },
  {
    activity: "bicycling",
    motion: "bicycling, 14-15.9 mph, racing or leisure, fast, vigorous effort",
    mets: "10.0",
  },
  {
    activity: "bicycling",
    motion:
      "bicycling, 16-19 mph, racing/not drafting or > 19 mph drafting, very fast, racing general",
    mets: "12.0",
  },
  {
    activity: "bicycling",
    motion: "bicycling, > 20 mph, racing, not drafting",
    mets: "15.8",
  },
  {
    activity: "bicycling",
    motion:
      "bicycling, 12 mph, seated, hands on brake hoods or bar drops, 80 rpm",
    mets: "8.5",
  },
  {
    activity: "bicycling",
    motion: "bicycling, 12 mph, standing, hands on brake hoods, 60 rpm",
    mets: "9.0",
  },
  {
    activity: "bicycling",
    motion: "unicycling",
    mets: "5.0",
  },
  {
    activity: "conditioning exercise",
    motion:
      "activity promoting video game (e.g., Wii Fit), light effort (e.g., balance, yoga)",
    mets: "2.3",
  },
  {
    activity: "conditioning exercise",
    motion:
      "activity promoting video game (e.g., Wii Fit), moderate effort (e.g., aerobic, resistance)",
    mets: "3.8",
  },
  {
    activity: "conditioning exercise",
    motion:
      "activity promoting video/arcade game (e.g., Exergaming, Dance Dance Revolution), vigorous effort",
    mets: "7.2",
  },
  {
    activity: "conditioning exercise",
    motion: "army type obstacle course exercise, boot camp training program",
    mets: "5.0",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, general",
    mets: "7.0",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, 30-50 watts, very light to light effort",
    mets: "3.5",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, 90-100 watts, moderate to vigorous effort",
    mets: "6.8",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, 101-160 watts, vigorous effort",
    mets: "8.8",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, 161-200 watts, vigorous effort",
    mets: "11.0",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, 201-270 watts, very vigorous effort",
    mets: "14.0",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, 51-89 watts, light-to-moderate effort",
    mets: "4.8",
  },
  {
    activity: "conditioning exercise",
    motion: "bicycling, stationary, RPM/Spin bike class",
    mets: "8.5",
  },
  {
    activity: "conditioning exercise",
    motion:
      "calisthenics (e.g., push ups, sit ups, pull-ups, jumping jacks), vigorous effort",
    mets: "8.0",
  },
  {
    activity: "conditioning exercise",
    motion:
      "calisthenics (e.g., push ups, sit ups, pull-ups, lunges), moderate effort",
    mets: "3.8",
  },
  {
    activity: "conditioning exercise",
    motion: "calisthenics (e.g., situps, abdominal crunches), light effort",
    mets: "2.8",
  },
  {
    activity: "conditioning exercise",
    motion:
      "calisthenics, light or moderate effort, general (e.g., back exercises), going up & down from floor ( 150)",
    mets: "3.5",
  },
  {
    activity: "conditioning exercise",
    motion: "circuit training, moderate effort",
    mets: "4.3",
  },
  {
    activity: "conditioning exercise",
    motion:
      "circuit training, including kettlebells, some aerobic movement with minimal rest, general, vigorous intensity",
    mets: "8.0",
  },
  {
    activity: "conditioning exercise",
    motion: "CurvesTM exercise routines in women",
    mets: "3.5",
  },
  {
    activity: "conditioning exercise",
    motion: "Elliptical trainer, moderate effort",
    mets: "5.0",
  },
  {
    activity: "conditioning exercise",
    motion:
      "resistance training (weight lifting, free weight, nautilus or universal), power lifting or body building, vigorous effort",
    mets: "6.0",
  },
  {
    activity: "conditioning exercise",
    motion: "resistance (weight) training, squats , slow or explosive effort",
    mets: "5.0",
  },
  {
    activity: "conditioning exercise",
    motion:
      "resistance (weight) training, multiple exercises, 8-15 repetitions at varied resistance",
    mets: "3.5",
  },
  {
    activity: "conditioning exercise",
    motion: "health club exercise, general",
    mets: "5.5",
  },
  {
    activity: "conditioning exercise",
    motion:
      "health club exercise classes, general, gym/weight training combined in one visit",
    mets: "5.0",
  },
  {
    activity: "conditioning exercise",
    motion: "health club exercise, conditioning classes",
    mets: "7.8",
  },
  {
    activity: "conditioning exercise",
    motion: "home exercise, general",
    mets: "3.8",
  },
  {
    activity: "conditioning exercise",
    motion: "stair-treadmill ergometer, general",
    mets: "9.0",
  },
  {
    activity: "conditioning exercise",
    motion: "rope skipping, general",
    mets: "12.3",
  },
  {
    activity: "conditioning exercise",
    motion: "rowing, stationary ergometer, general, vigorous effort",
    mets: "6.0",
  },
  {
    activity: "conditioning exercise",
    motion: "rowing, stationary, general, moderate effort",
    mets: "4.8",
  },
  {
    activity: "conditioning exercise",
    motion: "rowing, stationary, 100 watts, moderate effort",
    mets: "7.0",
  },
  {
    activity: "conditioning exercise",
    motion: "rowing, stationary, 150 watts, vigorous effort",
    mets: "8.5",
  },
  {
    activity: "conditioning exercise",
    motion: "rowing, stationary, 200 watts, very vigorous effort",
    mets: "12.0",
  },
  {
    activity: "conditioning exercise",
    motion: "ski machine, general",
    mets: "6.8",
  },
  {
    activity: "conditioning exercise",
    motion: "slide board exercise, general",
    mets: "11.0",
  },
  {
    activity: "conditioning exercise",
    motion: "slimnastics, jazzercise",
    mets: "6.0",
  },
  {
    activity: "conditioning exercise",
    motion: "stretching, mild",
    mets: "2.3",
  },
  {
    activity: "conditioning exercise",
    motion: "pilates, general",
    mets: "3.0",
  },
  {
    activity: "conditioning exercise",
    motion: "teaching exercise class (e.g., aerobic, water)",
    mets: "6.8",
  },
  {
    activity: "conditioning exercise",
    motion: "therapeutic exercise ball, Fitball exercise",
    mets: "2.8",
  },
  {
    activity: "conditioning exercise",
    motion: "upper body exercise, arm ergometer",
    mets: "2.8",
  },
  {
    activity: "conditioning exercise",
    motion:
      "upper body exercise, stationary bicycle – Airdyne (arms only) 40 rpm, moderate",
    mets: "4.3",
  },
  {
    activity: "conditioning exercise",
    motion: "water aerobics, water calisthenics, water exercise",
    mets: "5.3",
  },
  {
    activity: "conditioning exercise",
    motion: "whirlpool, sitting",
    mets: "1.3",
  },
  {
    activity: "conditioning exercise",
    motion:
      "video exercise workouts, TV conditioning programs (e.g., yoga, stretching), light effort",
    mets: "2.3",
  },
  {
    activity: "conditioning exercise",
    motion:
      "video exercise workouts, TV conditioning programs (e.g., cardio-resistance), moderate effort",
    mets: "4.0",
  },
  {
    activity: "conditioning exercise",
    motion:
      "video exercise workouts, TV conditioning programs (e.g., cardio-resistance), vigorous effort",
    mets: "6.0",
  },
  {
    activity: "conditioning exercise",
    motion: "yoga, Hatha",
    mets: "2.5",
  },
  {
    activity: "conditioning exercise",
    motion: "yoga, Power",
    mets: "4.0",
  },
  {
    activity: "conditioning exercise",
    motion: "yoga, Nadisodhana",
    mets: "2.0",
  },
  {
    activity: "conditioning exercise",
    motion: "yoga, Surya Namaskar",
    mets: "3.3",
  },
  {
    activity: "conditioning exercise",
    motion:
      "native New Zealander physical activities (e.g., Haka Powhiri, Moteatea, Waita Tira, Whakawatea, etc.), general, moderate effort",
    mets: "5.3",
  },
  {
    activity: "conditioning exercise",
    motion:
      "native New Zealander physical activities (e.g., Haka, Taiahab), general, vigorous effort",
    mets: "6.8",
  },
  {
    activity: "dancing",
    motion: "ballet, modern, or jazz, general, rehearsal or class",
    mets: "5.0",
  },
  {
    activity: "dancing",
    motion: "ballet, modern, or jazz, performance, vigorous effort",
    mets: "6.8",
  },
  {
    activity: "dancing",
    motion: "tap",
    mets: "4.8",
  },
  {
    activity: "dancing",
    motion: "aerobic, general",
    mets: "7.3",
  },
  {
    activity: "dancing",
    motion: "aerobic, step, with 6 – 8 inch step",
    mets: "7.5",
  },
  {
    activity: "dancing",
    motion: "aerobic, step, with 10 – 12 inch step",
    mets: "9.5",
  },
  {
    activity: "dancing",
    motion: "aerobic, step, with 4-inch step",
    mets: "5.5",
  },
  {
    activity: "dancing",
    motion: "bench step class, general",
    mets: "8.5",
  },
  {
    activity: "dancing",
    motion: "aerobic, low impact",
    mets: "5.0",
  },
  {
    activity: "dancing",
    motion: "aerobic, high impact",
    mets: "7.3",
  },
  {
    activity: "dancing",
    motion: "aerobic dance wearing 10-15 lb weights",
    mets: "10.0",
  },
  {
    activity: "dancing",
    motion:
      "ethnic or cultural dancing (e.g., Greek, Middle Eastern, hula, salsa, merengue, bamba y plena, flamenco, belly, and swing)",
    mets: "4.5",
  },
  {
    activity: "dancing",
    motion: "ballroom, fast",
    mets: "5.5",
  },
  {
    activity: "dancing",
    motion:
      "general dancing (e.g., disco, folk, Irish step dancing, line dancing, polka, contra, country)",
    mets: "7.8",
  },
  {
    activity: "dancing",
    motion: "ballroom dancing, competitive, general",
    mets: "11.3",
  },
  {
    activity: "dancing",
    motion:
      "ballroom, slow (e.g., waltz, foxtrot, slow dancing, samba, tango, 19th century dance, mambo, cha cha)",
    mets: "3.0",
  },
  {
    activity: "dancing",
    motion: "Anishinaabe Jingle Dancing",
    mets: "5.5",
  },
  {
    activity: "dancing",
    motion:
      "Caribbean dance (Abakua, Beguine, Bellair, Bongo, Brukin’s, Caribbean Quadrills, Dinki Mini, Gere, Gumbay, Ibo, Jonkonnu, Kumina, Oreisha, Jambu)",
    mets: "3.5",
  },
  {
    activity: "running",
    motion: "jog/walk combination (jogging component of less than 10 minutes)",
    mets: "6.0",
  },
  {
    activity: "running",
    motion: "jogging, general",
    mets: "7.0",
  },
  {
    activity: "running",
    motion: "jogging, in place",
    mets: "8.0",
  },
  {
    activity: "running",
    motion: "jogging, on a mini-tramp",
    mets: "4.5",
  },
  {
    activity: "running",
    motion: "Running, 4 mph (13 min/mile)",
    mets: "6.0",
  },
  {
    activity: "running",
    motion: "running, 5 mph (12 min/mile)",
    mets: "8.3",
  },
  {
    activity: "running",
    motion: "running, 5.2 mph (11.5 min/mile)",
    mets: "9.0",
  },
  {
    activity: "running",
    motion: "running, 6 mph (10 min/mile)",
    mets: "9.8",
  },
  {
    activity: "running",
    motion: "running, 6.7 mph (9 min/mile)",
    mets: "10.5",
  },
  {
    activity: "running",
    motion: "running, 7 mph (8.5 min/mile)",
    mets: "11.0",
  },
  {
    activity: "running",
    motion: "running, 7.5 mph (8 min/mile)",
    mets: "11.5",
  },
  {
    activity: "running",
    motion: "running, 8 mph (7.5 min/mile)",
    mets: "11.8",
  },
  {
    activity: "running",
    motion: "running, 8.6 mph (7 min/mile)",
    mets: "12.3",
  },
  {
    activity: "running",
    motion: "running, 9 mph (6.5 min/mile)",
    mets: "12.8",
  },
  {
    activity: "running",
    motion: "running, 10 mph (6 min/mile)",
    mets: "14.5",
  },
  {
    activity: "running",
    motion: "running, 11 mph (5.5 min/mile)",
    mets: "16.0",
  },
  {
    activity: "running",
    motion: "running, 12 mph (5 min/mile)",
    mets: "19.0",
  },
  {
    activity: "running",
    motion: "running, 13 mph (4.6 min/mile)",
    mets: "19.8",
  },
  {
    activity: "running",
    motion: "running, 14 mph (4.3 min/mile)",
    mets: "23.0",
  },
  {
    activity: "running",
    motion: "running, cross country",
    mets: "9.0",
  },
  {
    activity: "running",
    motion: "running",
    mets: "8.0",
  },
  {
    activity: "running",
    motion: "running, stairs, up",
    mets: "15.0",
  },
  {
    activity: "running",
    motion: "running, on a track, team practice",
    mets: "10.0",
  },
  {
    activity: "running",
    motion: "running, training, pushing a wheelchair or baby carrier",
    mets: "8.0",
  },
  {
    activity: "running",
    motion: "running, marathon",
    mets: "13.3",
  },
  {
    activity: "sexual activity",
    motion: "active, vigorous effort",
    mets: "2.8",
  },
  {
    activity: "sexual activity",
    motion: "general, moderate effort",
    mets: "1.8",
  },
  {
    activity: "sexual activity",
    motion: "passive, light effort, kissing, hugging",
    mets: "1.3",
  },
  {
    activity: "sports",
    motion: "Alaska Native Games, Eskimo Olympics, general",
    mets: "5.5",
  },
  {
    activity: "sports",
    motion: "archery, non-hunting",
    mets: "4.3",
  },
  {
    activity: "sports",
    motion: "badminton, competitive",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion: "badminton, social singles and doubles, general",
    mets: "5.5",
  },
  {
    activity: "sports",
    motion: "basketball, game",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "basketball, non-game, general",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "basketball, general",
    mets: "6.5",
  },
  {
    activity: "sports",
    motion: "basketball, officiating",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion: "basketball, shooting baskets",
    mets: "4.5",
  },
  {
    activity: "sports",
    motion: "basketball, drills, practice",
    mets: "9.3",
  },
  {
    activity: "sports",
    motion: "basketball, wheelchair",
    mets: "7.8",
  },
  {
    activity: "sports",
    motion: "billiards",
    mets: "2.5",
  },
  {
    activity: "sports",
    motion: "bowling",
    mets: "3.0",
  },
  {
    activity: "sports",
    motion: "bowling, indoor, bowling alley",
    mets: "3.8",
  },
  {
    activity: "sports",
    motion: "boxing, in ring, general",
    mets: "12.8",
  },
  {
    activity: "sports",
    motion: "boxing, punching bag",
    mets: "5.5",
  },
  {
    activity: "sports",
    motion: "boxing, sparring",
    mets: "7.8",
  },
  {
    activity: "sports",
    motion: "broomball",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion:
      "children’s games, adults playing (e.g., hopscotch, 4-square, dodgeball, playground apparatus, t-ball, tetherball, marbles, arcade games), moderate effort",
    mets: "5.8",
  },
  {
    activity: "sports",
    motion: "cheerleading, gymnastic moves, competitive",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "coaching, football, soccer, basketball, baseball, swimming, etc.",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "coaching, actively playing sport with players",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "cricket, batting, bowling, fielding",
    mets: "4.8",
  },
  {
    activity: "sports",
    motion: "croquet",
    mets: "3.3",
  },
  {
    activity: "sports",
    motion: "curling",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "darts, wall or lawn",
    mets: "2.5",
  },
  {
    activity: "sports",
    motion: "drag racing, pushing or driving a car",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "auto racing, open wheel",
    mets: "8.5",
  },
  {
    activity: "sports",
    motion: "fencing",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "football, competitive",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "football, touch, flag, general",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "football, touch, flag, light effort",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "football or baseball, playing catch",
    mets: "2.5",
  },
  {
    activity: "sports",
    motion: "frisbee playing, general",
    mets: "3.0",
  },
  {
    activity: "sports",
    motion: "frisbee, ultimate",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "golf, general",
    mets: "4.8",
  },
  {
    activity: "sports",
    motion: "golf, walking, carrying clubs",
    mets: "4.3",
  },
  {
    activity: "sports",
    motion: "golf, miniature, driving range",
    mets: "3.0",
  },
  {
    activity: "sports",
    motion: "golf, walking, pulling clubs",
    mets: "5.3",
  },
  {
    activity: "sports",
    motion: "golf, using power cart",
    mets: "3.5",
  },
  {
    activity: "sports",
    motion: "gymnastics, general",
    mets: "3.8",
  },
  {
    activity: "sports",
    motion: "hacky sack",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "handball, general",
    mets: "12.0",
  },
  {
    activity: "sports",
    motion: "handball, team",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "high ropes course, multiple elements",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "hang gliding",
    mets: "3.5",
  },
  {
    activity: "sports",
    motion: "hockey, field",
    mets: "7.8",
  },
  {
    activity: "sports",
    motion: "hockey, ice, general",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "hockey, ice, competitive",
    mets: "10.0",
  },
  {
    activity: "sports",
    motion: "horseback riding, general",
    mets: "5.5",
  },
  {
    activity: "sports",
    motion:
      "horse chores, feeding, watering, cleaning stalls, implied walking and lifting loads",
    mets: "4.3",
  },
  {
    activity: "sports",
    motion: "saddling, cleaning, grooming, harnessing and unharnessing horse",
    mets: "4.5",
  },
  {
    activity: "sports",
    motion: "horseback riding, trotting",
    mets: "5.8",
  },
  {
    activity: "sports",
    motion: "horseback riding, canter or gallop",
    mets: "7.3",
  },
  {
    activity: "sports",
    motion: "horseback riding,walking",
    mets: "3.8",
  },
  {
    activity: "sports",
    motion: "horseback riding, jumping",
    mets: "9.0",
  },
  {
    activity: "sports",
    motion: "horse cart, driving, standing or sitting",
    mets: "1.8",
  },
  {
    activity: "sports",
    motion: "horseshoe pitching, quoits",
    mets: "3.0",
  },
  {
    activity: "sports",
    motion: "jai alai",
    mets: "12.0",
  },
  {
    activity: "sports",
    motion:
      "martial arts, different types, slower pace, novice performers, practice",
    mets: "5.3",
  },
  {
    activity: "sports",
    motion:
      "martial arts, different types, moderate pace (e.g., judo, jujitsu, karate, kick boxing, tae kwan do, tai-bo, Muay Thai boxing)",
    mets: "10.3",
  },
  {
    activity: "sports",
    motion: "juggling",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "kickball",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion: "lacrosse",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "lawn bowling, bocce ball, outdoor",
    mets: "3.3",
  },
  {
    activity: "sports",
    motion: "moto-cross, off-road motor sports, all-terrain vehicle, general",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "orienteering",
    mets: "9.0",
  },
  {
    activity: "sports",
    motion: "paddleball, competitive",
    mets: "10.0",
  },
  {
    activity: "sports",
    motion: "paddleball, casual, general",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "polo, on horseback",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "racquetball, competitive",
    mets: "10.0",
  },
  {
    activity: "sports",
    motion: "racquetball, general",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion: "rock or mountain climbing",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "rock climbing, ascending rock, high difficulty",
    mets: "7.5",
  },
  {
    activity: "sports",
    motion:
      "rock climbing, ascending or traversing rock, low-to-moderate difficulty",
    mets: "5.8",
  },
  {
    activity: "sports",
    motion: "rock climbing, rappelling",
    mets: "5.0",
  },
  {
    activity: "sports",
    motion: "rodeo sports, general, light effort",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "rodeo sports, general, moderate effort",
    mets: "5.5",
  },
  {
    activity: "sports",
    motion: "rodeo sports, general, vigorous effort",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion: "rope jumping, fast pace, 120-160 skips/min",
    mets: "12.3",
  },
  {
    activity: "sports",
    motion:
      "rope jumping, moderate pace, 100-120 skips/min, general, 2 foot skip, plain bounce",
    mets: "11.8",
  },
  {
    activity: "sports",
    motion:
      "rope jumping, slow pace, < 100 skips/min, 2 foot skip, rhythm bounce",
    mets: "8.8",
  },
  {
    activity: "sports",
    motion: "rugby, union, team, competitive",
    mets: "8.3",
  },
  {
    activity: "sports",
    motion: "rugby, touch, non-competitive",
    mets: "6.3",
  },
  {
    activity: "sports",
    motion: "shuffleboard",
    mets: "3.0",
  },
  {
    activity: "sports",
    motion: "skateboarding, general, moderate effort",
    mets: "5.0",
  },
  {
    activity: "sports",
    motion: "skateboarding, competitive, vigorous effort",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "skating, roller",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion:
      "rollerblading, in-line skating, 14.4 km/h (9.0 mph), recreational pace",
    mets: "7.5",
  },
  {
    activity: "sports",
    motion:
      "rollerblading, in-line skating, 17.7 km/h (11.0 mph), moderate pace, exercise training",
    mets: "9.8",
  },
  {
    activity: "sports",
    motion:
      "rollerblading, in-line skating, 21.0 to 21.7 km/h (13.0 to 13.6 mph), fast pace, exercise training",
    mets: "12.3",
  },
  {
    activity: "sports",
    motion:
      "rollerblading, in-line skating, 24.0 km/h (15.0 mph), maximal effort",
    mets: "14.0",
  },
  {
    activity: "sports",
    motion: "skydiving, base jumping, bungee jumping",
    mets: "3.5",
  },
  {
    activity: "sports",
    motion: "soccer, competitive",
    mets: "10.0",
  },
  {
    activity: "sports",
    motion: "soccer, casual, general",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion: "softball or baseball, fast or slow pitch, general",
    mets: "5.0",
  },
  {
    activity: "sports",
    motion: "softball, practice",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "softball, officiating",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "softball, pitching",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "sports spectator, very excited, emotional, physically moving",
    mets: "3.3",
  },
  {
    activity: "sports",
    motion: "squash",
    mets: "12.0",
  },
  {
    activity: "sports",
    motion: "squash, general",
    mets: "7.3",
  },
  {
    activity: "sports",
    motion: "table tennis, ping pong",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "tai chi, qi gong, general",
    mets: "3.0",
  },
  {
    activity: "sports",
    motion: "tai chi, qi gong, sitting, light effort",
    mets: "1.5",
  },
  {
    activity: "sports",
    motion: "tennis, general",
    mets: "7.3",
  },
  {
    activity: "sports",
    motion: "tennis, doubles",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "tennis, doubles",
    mets: "4.5",
  },
  {
    activity: "sports",
    motion: "tennis, singles",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "tennis, hitting balls, non-game play, moderate effort",
    mets: "5.0",
  },
  {
    activity: "sports",
    motion: "trampoline, recreational",
    mets: "3.5",
  },
  {
    activity: "sports",
    motion: "trampoline, competitive",
    mets: "4.5",
  },
  {
    activity: "sports",
    motion: "volleyball",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion: "volleyball, competitive, in gymnasium",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "volleyball, non-competitive, 6 – 9 member team, general",
    mets: "3.0",
  },
  {
    activity: "sports",
    motion: "volleyball, beach, in sand",
    mets: "8.0",
  },
  {
    activity: "sports",
    motion: "wrestling (one match = 5 minutes)",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "wallyball, general",
    mets: "7.0",
  },
  {
    activity: "sports",
    motion: "track and field (e.g., shot, discus, hammer throw)",
    mets: "4.0",
  },
  {
    activity: "sports",
    motion:
      "track and field (e.g., high jump, long jump, triple jump, javelin, pole vault)",
    mets: "6.0",
  },
  {
    activity: "sports",
    motion: "track and field (e.g., steeplechase, hurdles)",
    mets: "10.0",
  },
  {
    activity: "transportation",
    motion: "automobile or light truck (not a semi) driving",
    mets: "2.5",
  },
  {
    activity: "transportation",
    motion: "riding in a car or truck",
    mets: "1.3",
  },
  {
    activity: "transportation",
    motion: "riding in a bus or train",
    mets: "1.3",
  },
  {
    activity: "transportation",
    motion: "flying airplane or helicopter",
    mets: "1.8",
  },
  {
    activity: "transportation",
    motion: "motor scooter, motorcycle",
    mets: "3.5",
  },
  {
    activity: "transportation",
    motion: "pulling rickshaw",
    mets: "6.3",
  },
  {
    activity: "transportation",
    motion: "pushing plane in and out of hangar",
    mets: "6.0",
  },
  {
    activity: "transportation",
    motion: "truck, semi, tractor, > 1 ton, or bus, driving",
    mets: "2.5",
  },
  {
    activity: "transportation",
    motion:
      "walking for transportation, 2.8-3.2 mph, level, moderate pace, firm surface",
    mets: "3.5",
  },
  {
    activity: "walking",
    motion: "backpacking",
    mets: "7.0",
  },
  {
    activity: "walking",
    motion: "backpacking, hiking or organized walking with a daypack",
    mets: "7.8",
  },
  {
    activity: "walking",
    motion:
      "carrying 15 pound load (e.g. suitcase), level ground or downstairs",
    mets: "5.0",
  },
  {
    activity: "walking",
    motion: "carrying 15 lb child, slow walking",
    mets: "2.3",
  },
  {
    activity: "walking",
    motion: "carrying load upstairs, general",
    mets: "8.3",
  },
  {
    activity: "walking",
    motion: "carrying 1 to 15 lb load, upstairs",
    mets: "5.0",
  },
  {
    activity: "walking",
    motion: "carrying 16 to 24 lb load, upstairs",
    mets: "6.0",
  },
  {
    activity: "walking",
    motion: "carrying 25 to 49 lb load, upstairs",
    mets: "8.0",
  },
  {
    activity: "walking",
    motion: "carrying 50 to 74 lb load, upstairs",
    mets: "10.0",
  },
  {
    activity: "walking",
    motion: "carrying > 74 lb load, upstairs",
    mets: "12.0",
  },
  {
    activity: "walking",
    motion: "loading /unloading a car, implied walking",
    mets: "3.5",
  },
  {
    activity: "walking",
    motion: "climbing hills, no load",
    mets: "6.3",
  },
  {
    activity: "walking",
    motion: "climbing hills with 0 to 9 lb load",
    mets: "6.5",
  },
  {
    activity: "walking",
    motion: "climbing hills with 10 to 20 lb load",
    mets: "7.3",
  },
  {
    activity: "walking",
    motion: "climbing hills with 21 to 42 lb load",
    mets: "8.3",
  },
  {
    activity: "walking",
    motion: "climbing hills with 42+ lb load",
    mets: "9.0",
  },
  {
    activity: "walking",
    motion: "descending stairs",
    mets: "3.5",
  },
  {
    activity: "walking",
    motion: "hiking, cross country",
    mets: "6.0",
  },
  {
    activity: "walking",
    motion: "hiking or walking at a normal pace through fields and hillsides",
    mets: "5.3",
  },
  {
    activity: "walking",
    motion: "bird watching, slow walk",
    mets: "2.5",
  },
  {
    activity: "walking",
    motion: "marching, moderate speed, military, no pack",
    mets: "4.5",
  },
  {
    activity: "walking",
    motion: "marching rapidly, military, no pack",
    mets: "8.0",
  },
  {
    activity: "walking",
    motion:
      "pushing or pulling stroller with child or walking with children, 2.5 to 3.1 mph",
    mets: "4.0",
  },
  {
    activity: "walking",
    motion: "pushing a wheelchair, non-occupational",
    mets: "3.8",
  },
  {
    activity: "walking",
    motion: "race walking",
    mets: "6.5",
  },
  {
    activity: "walking",
    motion: "stair climbing, using or climbing up ladder",
    mets: "8.0",
  },
  {
    activity: "walking",
    motion: "stair climbing, slow pace",
    mets: "4.0",
  },
  {
    activity: "walking",
    motion: "stair climbing, fast pace",
    mets: "8.8",
  },
  {
    activity: "walking",
    motion: "using crutches",
    mets: "5.0",
  },
  {
    activity: "walking",
    motion: "walking, household",
    mets: "2.0",
  },
  {
    activity: "walking",
    motion: "walking, less than 2.0 mph, level, strolling, very slow",
    mets: "2.0",
  },
  {
    activity: "walking",
    motion: "walking, 2.0 mph, level, slow pace, firm surface",
    mets: "2.8",
  },
  {
    activity: "walking",
    motion: "walking for pleasure",
    mets: "3.5",
  },
  {
    activity: "walking",
    motion:
      "walking from house to car or bus, from car or bus to go places, from car or bus to and from the worksite",
    mets: "2.5",
  },
  {
    activity: "walking",
    motion: "walking to neighbor’s house or family’s house for social reasons",
    mets: "2.5",
  },
  {
    activity: "walking",
    motion: "walking the dog",
    mets: "3.0",
  },
  {
    activity: "walking",
    motion: "walking, 2.5 mph, level, firm surface",
    mets: "3.0",
  },
  {
    activity: "walking",
    motion: "walking, 2.5 mph, downhill",
    mets: "3.3",
  },
  {
    activity: "walking",
    motion: "walking, 2.8 to 3.2 mph, level, moderate pace, firm surface",
    mets: "3.5",
  },
  {
    activity: "walking",
    motion:
      "walking, 3.5 mph, level, brisk, firm surface, walking for exercise",
    mets: "4.3",
  },
  {
    activity: "walking",
    motion: "walking, 2.9 to 3.5 mph, uphill, 1 to 5% grade",
    mets: "5.3",
  },
  {
    activity: "walking",
    motion: "walking, 2.9 to 3.5 mph, uphill, 6% to 15% grade",
    mets: "8.0",
  },
  {
    activity: "walking",
    motion: "walking, 4.0 mph, level, firm surface, very brisk pace",
    mets: "5.0",
  },
  {
    activity: "walking",
    motion: "walking, 4.5 mph, level, firm surface, very, very brisk",
    mets: "7.0",
  },
  {
    activity: "walking",
    motion: "walking, 5.0 mph, level, firm surface",
    mets: "8.3",
  },
  {
    activity: "walking",
    motion: "walking, 5.0 mph, uphill, 3% grade",
    mets: "9.8",
  },
  {
    activity: "walking",
    motion: "walking, for pleasure, work break",
    mets: "3.5",
  },
  {
    activity: "walking",
    motion: "walking, grass track",
    mets: "4.8",
  },
  {
    activity: "walking",
    motion: "walking, normal pace, plowed field or sand",
    mets: "4.5",
  },
  {
    activity: "walking",
    motion: "walking, to work or class",
    mets: "4.0",
  },
  {
    activity: "walking",
    motion: "walking, to and from an outhouse",
    mets: "2.5",
  },
  {
    activity: "walking",
    motion:
      "walking, for exercise, 3.5 to 4 mph, with ski poles, Nordic walking, level, moderate pace",
    mets: "4.8",
  },
  {
    activity: "walking",
    motion:
      "walking, for exercise, 5.0 mph, with ski poles, Nordic walking, level, fast pace",
    mets: "9.5",
  },
  {
    activity: "walking",
    motion: "walking, for exercise, with ski poles, Nordic walking, uphill",
    mets: "6.8",
  },
  {
    activity: "walking",
    motion: "walking, backwards, 3.5 mph, level",
    mets: "6.0",
  },
  {
    activity: "walking",
    motion: "walking, backwards, 3.5 mph, uphill, 5% grade",
    mets: "8.0",
  },
  {
    activity: "water activities",
    motion: "boating, power, driving",
    mets: "2.5",
  },
  {
    activity: "water activities",
    motion: "boating, power, passenger, light",
    mets: "1.3",
  },
  {
    activity: "water activities",
    motion: "canoeing, on camping trip",
    mets: "4.0",
  },
  {
    activity: "water activities",
    motion: "canoeing, harvesting wild rice, knocking rice off the stalks",
    mets: "3.3",
  },
  {
    activity: "water activities",
    motion: "canoeing, portaging",
    mets: "7.0",
  },
  {
    activity: "water activities",
    motion: "canoeing, rowing, 2.0-3.9 mph, light effort",
    mets: "2.8",
  },
  {
    activity: "water activities",
    motion: "canoeing, rowing, 4.0-5.9 mph, moderate effort",
    mets: "5.8",
  },
  {
    activity: "water activities",
    motion: "canoeing, rowing, kayaking, competition, >6 mph, vigorous effort",
    mets: "12.5",
  },
  {
    activity: "water activities",
    motion: "canoeing, rowing, for pleasure, general",
    mets: "3.5",
  },
  {
    activity: "water activities",
    motion: "canoeing, rowing, in competition, or crew or sculling",
    mets: "12.0",
  },
  {
    activity: "water activities",
    motion: "diving, springboard or platform",
    mets: "3.0",
  },
  {
    activity: "water activities",
    motion: "kayaking, moderate effort",
    mets: "5.0",
  },
  {
    activity: "water activities",
    motion: "paddle boat",
    mets: "4.0",
  },
  {
    activity: "water activities",
    motion:
      "sailing, boat and board sailing, windsurfing, ice sailing, general",
    mets: "3.0",
  },
  {
    activity: "water activities",
    motion: "sailing, in competition",
    mets: "4.5",
  },
  {
    activity: "water activities",
    motion:
      "sailing, Sunfish/Laser/Hobby Cat, Keel boats, ocean sailing, yachting, leisure",
    mets: "3.3",
  },
  {
    activity: "water activities",
    motion: "skiing, water or wakeboarding",
    mets: "6.0",
  },
  {
    activity: "water activities",
    motion: "jet skiing, driving, in water",
    mets: "7.0",
  },
  {
    activity: "water activities",
    motion: "skindiving, fast",
    mets: "15.8",
  },
  {
    activity: "water activities",
    motion: "skindiving, moderate",
    mets: "11.8",
  },
  {
    activity: "water activities",
    motion: "skindiving, scuba diving, general",
    mets: "7.0",
  },
  {
    activity: "water activities",
    motion: "snorkeling",
    mets: "5.0",
  },
  {
    activity: "water activities",
    motion: "surfing, body or board, general",
    mets: "3.0",
  },
  {
    activity: "water activities",
    motion: "surfing, body or board, competitive",
    mets: "5.0",
  },
  {
    activity: "water activities",
    motion: "paddle boarding, standing",
    mets: "6.0",
  },
  {
    activity: "water activities",
    motion: "swimming laps, freestyle, fast, vigorous effort",
    mets: "9.8",
  },
  {
    activity: "water activities",
    motion:
      "swimming laps, freestyle, front crawl, slow, light or moderate effort",
    mets: "5.8",
  },
  {
    activity: "water activities",
    motion: "swimming, backstroke, general, training or competition",
    mets: "9.5",
  },
  {
    activity: "water activities",
    motion: "swimming, backstroke, recreational",
    mets: "4.8",
  },
  {
    activity: "water activities",
    motion: "swimming, breaststroke, general, training or competition",
    mets: "10.3",
  },
  {
    activity: "water activities",
    motion: "swimming, breaststroke, recreational",
    mets: "5.3",
  },
  {
    activity: "water activities",
    motion: "swimming, butterfly, general",
    mets: "13.8",
  },
  {
    activity: "water activities",
    motion: "swimming, crawl, fast speed, ~75 yards/minute, vigorous effort",
    mets: "10.0",
  },
  {
    activity: "water activities",
    motion: "swimming, crawl, medium speed, ~50 yards/minute, vigorous effort",
    mets: "8.3",
  },
  {
    activity: "water activities",
    motion: "swimming, lake, ocean, river",
    mets: "6.0",
  },
  {
    activity: "water activities",
    motion: "swimming, leisurely, not lap swimming, general",
    mets: "6.0",
  },
  {
    activity: "water activities",
    motion: "swimming, sidestroke, general",
    mets: "7.0",
  },
  {
    activity: "water activities",
    motion: "swimming, synchronized",
    mets: "8.0",
  },
  {
    activity: "water activities",
    motion: "swimming, treading water, fast, vigorous effort",
    mets: "9.8",
  },
  {
    activity: "water activities",
    motion: "swimming, treading water, moderate effort, general",
    mets: "3.5",
  },
  {
    activity: "water activities",
    motion: "tubing, floating on a river, general",
    mets: "2.3",
  },
  {
    activity: "water activities",
    motion: "water aerobics, water calisthenics",
    mets: "5.5",
  },
  {
    activity: "water activities",
    motion: "water polo",
    mets: "10.0",
  },
  {
    activity: "water activities",
    motion: "water volleyball",
    mets: "3.0",
  },
  {
    activity: "water activities",
    motion: "water jogging",
    mets: "9.8",
  },
  {
    activity: "water activities",
    motion: "water walking, light effort, slow pace",
    mets: "2.5",
  },
  {
    activity: "water activities",
    motion: "water walking, moderate effort, moderate pace",
    mets: "4.5",
  },
  {
    activity: "water activities",
    motion: "water walking, vigorous effort, brisk pace",
    mets: "6.8",
  },
  {
    activity: "water activities",
    motion: "whitewater rafting, kayaking, or canoeing",
    mets: "5.0",
  },
  {
    activity: "water activities",
    motion: "windsurfing, not pumping for speed",
    mets: "5.0",
  },
  {
    activity: "water activities",
    motion: "windsurfing or kitesurfing, crossing trial",
    mets: "11.0",
  },
  {
    activity: "water activities",
    motion: "windsurfing, competition, pumping for speed",
    mets: "13.5",
  },
  {
    activity: "winter activities",
    motion: "dog sledding, mushing",
    mets: "7.5",
  },
  {
    activity: "winter activities",
    motion: "dog sledding, passenger",
    mets: "2.5",
  },
  {
    activity: "winter activities",
    motion: "moving ice house, set up/drill holes",
    mets: "6.0",
  },
  {
    activity: "winter activities",
    motion: "ice fishing, sitting",
    mets: "2.0",
  },
  {
    activity: "winter activities",
    motion: "skating, ice dancing",
    mets: "14.0",
  },
  {
    activity: "winter activities",
    motion: "skating, ice, 9 mph or less",
    mets: "5.5",
  },
  {
    activity: "winter activities",
    motion: "skating, ice, general",
    mets: "7.0",
  },
  {
    activity: "winter activities",
    motion: "skating, ice, rapidly, more than 9 mph, not competitive",
    mets: "9.0",
  },
  {
    activity: "winter activities",
    motion: "skating, speed, competitive",
    mets: "13.3",
  },
  {
    activity: "winter activities",
    motion: "ski jumping, climb up carrying skis",
    mets: "7.0",
  },
  {
    activity: "winter activities",
    motion: "skiing, general",
    mets: "7.0",
  },
  {
    activity: "winter activities",
    motion: "skiing, cross country, 2.5 mph, slow or light effort, ski walking",
    mets: "6.8",
  },
  {
    activity: "winter activities",
    motion:
      "skiing, cross country, 4.0-4.9 mph, moderate speed and effort, general",
    mets: "9.0",
  },
  {
    activity: "winter activities",
    motion: "skiing, cross country, 5.0-7.9 mph, brisk speed, vigorous effort",
    mets: "12.5",
  },
  {
    activity: "winter activities",
    motion: "skiing, cross country, >8.0 mph, elite skier, racing",
    mets: "15.0",
  },
  {
    activity: "winter activities",
    motion:
      "skiing, cross country, hard snow, uphill, maximum, snow mountaineering",
    mets: "15.5",
  },
  {
    activity: "winter activities",
    motion: "skiing, cross-country, skating",
    mets: "13.3",
  },
  {
    activity: "winter activities",
    motion: "skiing, cross-country, biathlon, skating technique",
    mets: "13.5",
  },
  {
    activity: "winter activities",
    motion:
      "skiing, downhill, alpine or snowboarding, light effort, active time only",
    mets: "4.3",
  },
  {
    activity: "winter activities",
    motion:
      "skiing, downhill, alpine or snowboarding, moderate effort, general, active time only",
    mets: "5.3",
  },
  {
    activity: "winter activities",
    motion: "skiing, downhill, vigorous effort, racing",
    mets: "8.0",
  },
  {
    activity: "winter activities",
    motion: "skiing, roller, elite racers",
    mets: "12.5",
  },
  {
    activity: "winter activities",
    motion: "sledding, tobogganing, bobsledding, luge",
    mets: "7.0",
  },
  {
    activity: "winter activities",
    motion: "snow shoeing, moderate effort",
    mets: "5.3",
  },
  {
    activity: "winter activities",
    motion: "snow shoeing, vigorous effort",
    mets: "10.0",
  },
  {
    activity: "winter activities",
    motion: "snowmobiling, driving, moderate",
    mets: "3.5",
  },
  {
    activity: "winter activities",
    motion: "snowmobiling, passenger",
    mets: "2.0",
  },
  {
    activity: "winter activities",
    motion: "snow shoveling, by hand, moderate effort",
    mets: "5.3",
  },
  {
    activity: "winter activities",
    motion: "snow shoveling, by hand, vigorous effort",
    mets: "7.5",
  },
  {
    activity: "winter activities",
    motion: "snow blower, walking and pushing",
    mets: "2.5",
  },
];
export default met;
