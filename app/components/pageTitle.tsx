interface IProps {
    pageTitle: string;
}

export default function PageTitle(props: IProps) {

    return (
        <h1 className="text-4xl font-bold text-green-500 text-center my-6">
            {props.pageTitle}
        </h1>
    )
}