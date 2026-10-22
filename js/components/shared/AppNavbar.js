//AppNavbar shares navigation between the Start and Bake pages.
const AppNavbar = {
    props: {
        currentPage: {
            type: String,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },

    template: `
        <nav class="navbar navbar-expand-lg sticky-top"
             aria-label="Main navigation">
            <div class="container">
                <a class="navbar-brand"
                   :href="basePath + 'index.html'"
                   aria-label="Sourbro, starter and loaf">
                    <img :src="basePath + 'images/SourbroLogo.png'"
                         alt="Sourbro Start to Bake">
                </a>

                <button class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse"
                     id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link"
                               :class="{ active: currentPage === 'start' }"
                               :href="basePath + 'index.html'"
                               :aria-current="currentPage === 'start' ? 'page' : null">
                                Start
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link"
                               :class="{ active: currentPage === 'bake' }"
                               :href="basePath + 'pages/bake.html'"
                               :aria-current="currentPage === 'bake' ? 'page' : null">
                                Bake
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `
};

export default AppNavbar;