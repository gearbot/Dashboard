import {Component} from "preact";
import {PaginationProps} from "../../utils/Interfaces";
import {Text} from 'preact-i18n';

export default class Pagination extends Component<PaginationProps, {}> {

    gotoPage = (event) => {
        if (event.target.getAttribute("disabled"))
            return;
        this.props.mover(parseInt(event.target.getAttribute("data-page")))
    };

    render() {
        const {page, pages} = this.props;
        return (
            <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
                <a class="pagination-previous" data-page={page - 1} onclick={this.gotoPage} disabled={page == 1}><Text id="navigation.prev"/></a>
                <a class="pagination-next" data-page={page + 1} onclick={this.gotoPage}  disabled={page == pages}><Text id="navigation.next"/></a>
                <ul class="pagination-list">
                    {pages >= 2 && page != 1 ? <li><a class="pagination-link" data-page={1} onclick={this.gotoPage}>1</a></li> : null}
                    {page > 3 ? <li><span class="pagination-ellipsis">&hellip;</span></li> : null}
                    {page >= 3 ? <li><a class="pagination-link" data-page={page - 1} onclick={this.gotoPage}>{page - 1}</a></li> : null}
                    <li><a class="pagination-link is-current" aria-current="page">{page}</a></li>
                    {pages > page ? <li><a class="pagination-link" data-page={page + 1} onclick={this.gotoPage}>{page + 1}</a></li> : null}
                    {pages > page + 2 ? <li><span class="pagination-ellipsis">&hellip;</span></li> : null}
                    {pages >= page + 2? <li><a class="pagination-link" data-page={pages} onclick={this.gotoPage}>{pages}</a></li> : null }
                </ul>
            </nav>
        );
    }
}