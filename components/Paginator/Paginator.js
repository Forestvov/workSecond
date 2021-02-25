import style from '../../styles/Paginator.module.scss'

export default function Paginator({
                                      totalItemsCount = 100, pageSize = 10,
                                      currentPage,
                                      onPageChanged,
                                      portionSize = 10
                                  }) {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div className={style.paginator}>

        {pages

            .map((p) => {
                return <span className={`${style.link} ${currentPage === p && style.current}`}
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}

    </div>
}


