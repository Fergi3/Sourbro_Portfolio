const bakeSteps = [    //The ordered baking stages and their instructions, shared by active loaves.
    {
        id: 1,
        name: 'Mix',
        directions: [
            'Combine the active starter and water in a bowl. Use a dough whisk to mix until the starter is evenly dispersed and the liquid looks cloudy and milky.',
            'Add the flour and salt in either order.',
            'Mix until the dough looks rough and shaggy—almost like a shaggy carpet. Scrape the sides and bottom of the bowl, working any remaining flour into the dough.',
            'Cover the bowl with a plastic shower cap or loosely fitted plastic wrap. Let it rest for 30–45 minutes before starting stretch and folds. After the rest, select Complete Step.'
        ],
        tip: 'Forgot the salt? You can still incorporate it during stretch and folds.'
    },
    {
        id: 2,
        name: 'Stretch & Folds',
        sections: [
            {
                heading: 'Prepare',
                directions: [
                    'Wet your fingertips and dough scraper with cold water to help prevent sticking.',
                    'Forgot the salt during mixing? Use the recipe’s original measured amount, divided across the remaining rounds. Add a portion before each round. If you already added the salt, skip this.',
                    'Uncover the bowl. Before the first round, use your scraper to gently loosen the dough from the sides.'
                ]
            },
            {
                heading: 'Complete one round',
                directions: [
                    'Starting with the side furthest from you, gently stretch the dough upward, stopping before it tears. Aim just above the rim of the bowl—about 8–10 inches, if the dough stretches comfortably.',
                    'Fold the stretched dough into the center.',
                    'Rotate the bowl 90 degrees and repeat until you have folded all four sides. This completes one round.',
                    'Mark the round complete using the checkboxes below.'
                ]
            },
            {
                heading: 'Rest and repeat',
                directions: [
                    'Cover the bowl and rest for 20–30 minutes between rounds.',
                    'Complete 3–4 rounds, wetting your fingertips and scraper again as needed. Repeat the same stretch-and-fold technique each round.',
                    'After the final fold, the dough should form a compact, fairly even square or rectangle, resembling a folded envelope. Its shape will change as it relaxes and rises during bulk fermentation.'
                ]
            }
        ],
        instruction: 'After your final round, cover the dough and select Complete Step to continue to bulk fermentation.',
        tip: 'Stretch gently without tearing the dough. Wet your fingertips and scraper again as needed to prevent sticking.'
    },
    {
        id: 3,
        name: 'Bulk Fermentation',
        directions: [
            'Keep the dough covered in a warm spot in your kitchen. A spot beneath under-cabinet lighting can work well.',
            'Avoid placing the bowl directly on a cold granite or quartz countertop. Place a tea towel or wooden cutting board underneath.',
            'Another option is an unheated oven with only its light on. Check regularly because some oven lights produce considerable warmth. Keep the oven heat off and remove the dough before preheating.',
            'After your final stretch and fold, allow approximately 3–6 more hours for the dough to rise. Start checking earlier in a warm kitchen.',
            'Look for airy bubbles and approximately 50–60% growth from the dough’s original volume. Temperature and starter activity affect the timing, so judge the dough by its appearance rather than the clock.',
            'Once the dough shows these signs, select Complete Step to move to shaping.'
        ],
        tip: 'Bulk fermentation includes the initial rest and stretch-and-fold rounds. The 3–6-hour estimate describes the remaining rest in this method, not the total fermentation time.'
    },
    {
        id: 4,
        name: 'Shape',
        sections: [
            {
                heading: 'Prepare your surface',
                directions: [
                    'Lightly flour a clean, smooth work surface. Wet your dough scraper with cold water to help prevent sticking.',
                    'Use the scraper to loosen the dough from the sides of the bowl. Turn the bowl upside down over your work surface and gently release any dough still attached.',
                    'Gently ease the dough into an even circle or rectangle. Lift the edges as needed to distribute a little flour underneath and prevent sticking.'
                ]
            },
            {
                heading: 'Add your ingredients',
                requiresAddIns: true,
                directions: [
                    'Spread your selected add-ins evenly over the dough before folding the edges into the center during the first shaping.',
                    'Treat the listed amounts as a guide—you don’t need to use everything you prepared. Too many add-ins can make the dough difficult to fold and shape. If it feels overloaded, leave some out.',
                    'For cheese, use shredded cheese or small cubes. Fold gently around cubed cheese, as the corners can catch and tear the dough.',
                    'Add the ingredients during the first shaping only. After the 20-minute rest, repeat the shaping technique without adding more.'
                ]
            },
            {
                heading: 'First shaping',
                directions: [
                    'Imagine a star around the dough. Lift a small section of the outer edge and fold it into the center. Continue around the dough until all the edges meet in the middle.',
                    'Flip the dough so the folded seam faces down against the work surface.',
                    'Place the little-finger edge of one hand alongside the dough, as though preparing a gentle karate chop. Push the dough slightly away, then curve your hand around it. Bring in your other hand, cup the dough, and gently draw it toward you.',
                    'Follow a candy-cane motion: push away, hook around, and pull toward you. Keep the edges of your hands close to the work surface to gently tuck the dough underneath.',
                    'Repeat a few gentle passes until the loaf becomes rounder and its surface feels taut. Stop before the surface becomes overstretched or begins to tear.'
                ]
            },
            {
                heading: 'Rest and repeat',
                directions: [
                    'Lightly flour a bowl and place the dough inside, seam-side down. Cover and rest for 20 minutes.',
                    'Repeat the full shaping process: ease the dough into a circle or rectangle, fold the edges into the center, flip seam-side down, and repeat the candy-cane motion.'
                ]
            },
            {
                heading: 'Into the banneton',
                directions: [
                    'Place the liner in your banneton basket and flour it thoroughly to help prevent the dough from sticking.',
                    'Gently place the shaped dough in the basket smooth-side down, seam-side up. The smooth top of your loaf should rest against the floured liner.',
                    'Cover the basket with a plastic shower cap or plastic wrap and place it in the refrigerator. Select Complete Step to continue to Cold Proof.'
                ]
            }
        ],
        tip: 'Use enough flour on the work surface to prevent sticking, but avoid adding so much that the dough slides freely. You need some grip against the surface to build tension.'
    },
    {
        id: 5,
        name: 'Cold Proof',
        directions: [
            'Keep the shaped dough covered in its banneton and refrigerate at 35–38°F.',
            'Use plastic wrap or a shower cap to help prevent the surface from drying out and forming a skin. If using a tea towel, make sure the dough stays covered.',
            'Allow at least 8–9 hours for the cold proof. For this method, aim for 14–16 hours.',
            'Plan to bake within 24 hours. Longer cold proofs are possible, but are not recommended for this method.',
            'Keep the dough refrigerated while you prepare and preheat your baking equipment. Do not bring it to room temperature before baking.',
            'Once the cold proof is finished and you are ready to prepare for baking, select Complete Step. Leave the dough in the fridge until the oven and baking vessel are ready.'
        ],
        tip: 'Unlike bulk fermentation, this step primarily follows a planned refrigeration time rather than a target percentage of growth.'
    },
    {
        id: 6,
        name: 'Bake',
        sections: [
            {
                heading: 'Preheat',
                directions: [
                    'Preheat the oven to 450–475°F, using equipment and parchment rated for your chosen temperature. Follow your Dutch oven manufacturer’s instructions for empty preheating.',
                    'Once the oven reaches temperature, place the Dutch oven and lid inside to heat for 45 minutes.',
                    'Keep your dough in the refrigerator until your oven and Dutch oven are ready.'
                ]
            },
            {
                heading: 'Score and load',
                directions: [
                    'Prepare your parchment paper by crumpling loosely, this makes it easier to manipulate. Using dry oven mitts, carefully move the hot Dutch oven onto a heat-resistant surface and remove its lid.',
                    'Take the dough straight from the refrigerator. Gently turn it out of the banneton onto the parchment, smooth-side up.',
                    'Using a bread lame or very sharp knife, make one continuous cut from one end of the loaf to the other, approximately ¼–½ inch deep. (it is okay to score deeper, no more than 1 inch)',
                    'Hold the blade at a shallow angle to the dough’s surface to encourage an “ear”—the raised flap of crust along the score. Start with this main cut before trying decorative scoring.',
                    'Carefully lower the dough into the Dutch oven using the parchment.'
                ]
            },
            {
                heading: 'Bake covered',
                directions: [
                    'Replace the lid and return the Dutch oven to the oven.',
                    'Bake covered for approximately 25 minutes.'
                ]
            },
            {
                heading: 'Uncover and finish',
                directions: [
                    'Carefully remove the lid, keeping your face and hands away from escaping steam.',
                    'Bake uncovered for approximately 20 more minutes, until the crust reaches your desired color.',
                    'Remove the Dutch oven and place it on a heat-resistant surface. Let the loaf sit for about one minute.',
                    'Carefully transfer the loaf to a cooling rack using the parchment, supporting the loaf if the paper feels fragile.',
                    'Once the loaf is on the cooling rack, select Complete Step to continue to Cool.'
                ]
            }
        ],
        tip: 'The pot, lid, and handles remain extremely hot. Use dry oven mitts whenever handling them.'
    },
    {
        id: 7,
        name: 'Cool',
        sections: [
            {
                heading: 'Rest',
                directions: [
                    'Leave the loaf on a cooling rack for at least 6–8 hours before slicing. Allow air to circulate underneath and around the loaf.',
                    'Resist cutting into it while it is warm. The inside is still setting as it cools, so give the crumb time to firm up.',
                    'Once completely cool, place the loaf in a breathable paper bread bag and fold the opening closed.'
                ]
            },
            {
                heading: 'Slice',
                directions: [
                    'For the best slicing results with this method, wait until the following morning.',
                    'Use a serrated bread knife or bread slicer for clean, even slices.'
                ]
            },
            {
                heading: 'Store',
                directions: [
                    'For counter storage, keep the cooled loaf in its paper bread bag at room temperature. Aim to enjoy it within 4–5 days; freshness varies with kitchen conditions. Discard the loaf if mold appears.',
                    'For longer storage, slice the cooled loaf completely and place it in a freezer-safe, resealable bag. (beeswax lined bags, or BPA-free recommended)',
                    'Remove individual slices and toast them straight from frozen as needed.'
                ]
            }
        ],
        instruction: 'Once the loaf has cooled, select Finish Bake to record your results and save it to History.',
        tip: 'Plan ahead—the wait is part of the process. Letting the loaf cool fully makes slicing easier.'
    }
];

export default bakeSteps;