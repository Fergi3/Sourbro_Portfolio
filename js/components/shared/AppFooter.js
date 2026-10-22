//AppFooter shares the footer layout and learning-modal button.
const AppFooter = {
    template: `
        <footer class="site-footer">
            <div class="container">
                <div class="row align-items-center text-center">
                    <div class="col-12">
                        <button type="button"
                                class="btn btn-link footer-learn-link"
                                data-bs-toggle="modal"
                                data-bs-target="#learnSourdoughModal">
                            Learn About Sourdough
                        </button>

                        <p class="mb-0 small">&copy; 2026 Sourbro</p>
                    </div>
                </div>
            </div>
        </footer>
        <teleport to="body">
          <div class="modal fade learn-modal" id="learnSourdoughModal" tabindex="-1"
               aria-labelledby="learnSourdoughModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title fs-4" id="learnSourdoughModalLabel">Learn About Sourdough</h2>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <section class="starter-learning" id="learnSourdough">
                    <div class="container mt-3">

                      <p class="lead mb-4">Learn the basics, then care for your mother starter and recipe levains.</p>
                      <h3 class="mb-3">Sourdough Basics</h3>
                      <div class="accordion mb-4" id="sourdoughLearning">
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="sourdoughLearningTopic1Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#sourdoughLearningTopic1"
                                    aria-expanded="false" aria-controls="sourdoughLearningTopic1">
                              What Is Sourdough?
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="sourdoughLearningTopic1"
                               aria-labelledby="sourdoughLearningTopic1Heading">
                            <div class="accordion-body">
                              <p>
                                Sourdough is bread made through natural fermentation
                                using wild yeast and beneficial bacteria.
                              </p>
                              <p class="mb-0">
                                This slow fermentation helps the dough rise while
                                developing sourdough’s characteristic flavor and texture.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="sourdoughLearningTopic2Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#sourdoughLearningTopic2"
                                    aria-expanded="false" aria-controls="sourdoughLearningTopic2">
                              A Brief History
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="sourdoughLearningTopic2"
                               aria-labelledby="sourdoughLearningTopic2Heading">
                            <div class="accordion-body">
                              <p>
                                People have used naturally fermented dough to make bread
                                for thousands of years.
                              </p>
                              <p>
                                Before commercial yeast became widely available, bakers
                                maintained fermented cultures to help their dough rise.
                              </p>
                              <p class="mb-0">
                                Today, sourdough combines that traditional process with
                                modern tools, recipes, and temperature control.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="sourdoughLearningTopic3Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#sourdoughLearningTopic3"
                                    aria-expanded="false" aria-controls="sourdoughLearningTopic3">
                              How Fermentation Works
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="sourdoughLearningTopic3"
                               aria-labelledby="sourdoughLearningTopic3Heading">
                            <div class="accordion-body">
                              <p>
                                Wild yeast consumes sugars in the flour and produces
                                carbon dioxide, which helps the dough rise.
                              </p>
                              <p>
                                Beneficial bacteria create organic acids that contribute
                                flavor and help strengthen the dough.
                              </p>
                              <p class="mb-0">
                                Time and temperature affect how quickly fermentation
                                occurs and how the final loaf develops.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="sourdoughLearningTopic4Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#sourdoughLearningTopic4"
                                    aria-expanded="false" aria-controls="sourdoughLearningTopic4">
                              The Sourdough Process
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="sourdoughLearningTopic4"
                               aria-labelledby="sourdoughLearningTopic4Heading">
                            <div class="accordion-body">
                              <ol class="mb-0">
                                <li>Feed and prepare the starter.</li>
                                <li>Mix the dough.</li>
                                <li>Complete stretch and folds.</li>
                                <li>Allow the dough to bulk ferment.</li>
                                <li>Shape the loaf.</li>
                                <li>Cold proof the shaped dough.</li>
                                <li>Bake and cool the loaf.</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 class="mb-3">Caring for Your Starter</h3>
                      <div class="accordion mb-4" id="starterLearning">
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="starterLearningTopic1Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#starterLearningTopic1"
                                    aria-expanded="false" aria-controls="starterLearningTopic1">
                              What Is a Starter?
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="starterLearningTopic1"
                               aria-labelledby="starterLearningTopic1Heading">
                            <div class="accordion-body">
                              <p>
                                A sourdough starter is a living mixture of flour and water
                                containing wild yeast and beneficial bacteria.
                              </p>
                              <p class="mb-0">
                                Regular feedings keep the starter active and ready to help
                                bread rise naturally.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="starterLearningTopic2Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#starterLearningTopic2"
                                    aria-expanded="false" aria-controls="starterLearningTopic2">
                              Feeding Ratios
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="starterLearningTopic2"
                               aria-labelledby="starterLearningTopic2Heading">
                            <div class="accordion-body">
                              <p>
                                A feeding ratio compares the amounts of starter, flour,
                                and water used during feeding.
                              </p>
                              <p>
                                For example, a 1:2:2 ratio uses one part starter (10g), two
                                parts flour (20g), and two parts water (20g).
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="starterLearningTopic3Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#starterLearningTopic3"
                                    aria-expanded="false" aria-controls="starterLearningTopic3">
                              Starter Activity
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="starterLearningTopic3"
                               aria-labelledby="starterLearningTopic3Heading">
                            <div class="accordion-body">
                              <p>
                                An active starter develops bubbles, rises after feeding,
                                and has a pleasantly tangy aroma.
                              </p>
                              <p>
                                Marking the starter’s level after feeding makes it easier
                                to see how quickly it rises.
                              </p>
                              <p class="mb-0">
                                A starter that reliably doubles in size is generally
                                ready to use for baking.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="starterLearningTopic4Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#starterLearningTopic4"
                                    aria-expanded="false" aria-controls="starterLearningTopic4">
                              Storage &amp; Maintenance
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="starterLearningTopic4"
                               aria-labelledby="starterLearningTopic4Heading">
                            <div class="accordion-body">
                              <p>
                                Keep a frequently used starter at room temperature and
                                feed it on a consistent schedule.
                              </p>
                              <p>
                                For less frequent baking, store the starter covered in
                                the refrigerator and feed it about once a week.
                              </p>
                              <p class="mb-0">
                                Before baking with a refrigerated starter, return it to
                                room temperature and feed it until it becomes active.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="starterLearningTopic5Heading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#starterLearningTopic5"
                                    aria-expanded="false" aria-controls="starterLearningTopic5">
                              Using Your Starter
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="starterLearningTopic5"
                               aria-labelledby="starterLearningTopic5Heading">
                            <div class="accordion-body">
                              <p>
                                Use your starter when it is bubbly, active, and near its
                                highest point after feeding.
                              </p>
                              <p>
                                Measure the amount required by your recipe before feeding
                                or storing the remaining starter.
                              </p>
                              <p class="mb-0">
                                Extra starter can also be used in discard recipes such
                                as pancakes, crackers, and muffins.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h4 class="accordion-header" id="motherLevainHeading">
                            <button class="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#motherLevain"
                                    aria-expanded="false" aria-controls="motherLevain">
                              Mother Starter &amp; Levain
                            </button>
                          </h4>
                          <div class="accordion-collapse collapse" id="motherLevain"
                               aria-labelledby="motherLevainHeading">
                            <div class="accordion-body">
                              <p>A mother starter is the culture you maintain for future bakes. A levain is a portion
                                you build from it for a particular recipe.</p>
                              <p class="mb-0">Track each one separately so its feeding ratio, flour, and timing stay
                                clear.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </teleport>
    `
};

export default AppFooter;