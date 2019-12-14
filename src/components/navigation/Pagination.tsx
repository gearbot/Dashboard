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
            <nav class="pagination">
                {/*<a class="pagination-previous" data-page={page - 1} onClick={this.gotoPage} disabled={page == 1}><Text id="navigation.prev"/></a>*/}
                {/*<a class="pagination-next" data-page={page + 1} onClick={this.gotoPage}  disabled={page == pages}><Text id="navigation.next"/></a>*/}
                <div class="pagination-list">
                    {pages >= 2 && page != 1 ? <a class="pagination-link" data-page={1} onClick={this.gotoPage}>1</a> : null}
                    {page > 3 ? <div class="pagination-ellipsis">&heldivp;</div> : null}
                    {page >= 3 ? <a class="pagination-link" data-page={page - 1} onClick={this.gotoPage}>{page - 1}</a> : null}
                    <a class="pagination-link current-page" aria-current="page">{page}</a>
                    {pages > page ? <a class="pagination-link" data-page={page + 1} onClick={this.gotoPage}>{page + 1}</a> : null}
                    {pages > page + 2 ? <div class="pagination-ellipsis">&heldivp;</div> : null}
                    {pages >= page + 2? <a class="pagination-link" data-page={pages} onClick={this.gotoPage}>{pages}</a> : null }
                </div>
            </nav>
        );
    }
}